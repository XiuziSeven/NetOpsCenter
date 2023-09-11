from app.models import Devices,DeviceUser,DeviceBrand
import netmiko
from netmiko import ConnectHandler
from multiprocessing.dummy import Pool as ThreadPool

def defautoconfig(deviceid,commits):
    result = defconfig(deviceid,commits)
    results = '<------------------登录成功设备------------------->\n\n'
    results += switch_success
    if devicetype_error != '':
        results += '\n--------------netmiko_type字段错误）--------------\n\n'
        results += devicetype_error
    if switch_not_reachable != '':
        results += '\n--------------登录失败设备（不可达）--------------\n\n'
        results += switch_not_reachable
    if switch_with_authentication_issue != '':
        results += '\n--------------登录失败设备（认证失败）--------------\n\n'
        results += switch_with_authentication_issue
    results += '\n--------------------登录日志---------------------\n\n'
    for i in result:        
        results += i
    return results

def defconfig(deviceid,commits):
    devlist=[]
    for i in deviceid:
        devicename = Devices.objects.values_list('name', flat=True).get(id=i)
        ip = Devices.objects.values_list('ip', flat=True).get(id=i)
        devicebrandid = Devices.objects.values_list('device_brand', flat=True).get(id=i)
        devicebrand = DeviceBrand.objects.values_list('netmikotype', flat=True).get(id=devicebrandid)
        try:           
            userid = Devices.objects.values_list('device_user', flat=True).get(id=i)
            username = DeviceUser.objects.values_list('username', flat=True).get(id=userid)
            password = DeviceUser.objects.values_list('password', flat=True).get(id=userid)
            ssh_port = DeviceUser.objects.values_list('ssh_port', flat=True).get(id=userid)
        except:
            username = ''
            password = ''
            ssh_port = ''
        a=f'{devicename},{devicebrand},{ip},{username},{password},{ssh_port}'
        devlist.append(a)
    result = multithred(50,logindev,devlist,commits)
    return result


def multithred(numbers,defname,devlist,cmd): #并发
    pool = ThreadPool(numbers)  # 并发进程数 默认为核心数，可以写多条
    results = pool.map(lambda dev: defname(dev, cmd), devlist)
    pool.close()
    pool.join()
    return results
    
def logindev(devlist,cmd): #登录设备
    global switch_with_authentication_issue, switch_not_reachable, switch_success,devicetype_error
    switch_with_authentication_issue = ''
    switch_not_reachable = ''
    switch_success =''
    devicetype_error = ''
    try:
        list = devlist.split(",")
        hostname = list[0]
        devtype = list[1]
        ip = list[2]
        admin = list[3]
        devpasswd = list[4].replace("\n", "")
        ssh_port = list[5].replace("\n", "")
        result = ''
        conn = ConnectHandler(device_type=devtype,
                              host=ip,
                              port =ssh_port,
                              username=admin,
                              password=devpasswd,
                              conn_timeout = 100,
                              )
        #print(f'已成功登陆交换机{hostname}')
        """命令输入如下界面，无需输入sys 和 return，会自动进入配置模式，配置结束会自动退出"""
        output = conn.send_config_set(config_commands=cmd)
        result += f'-----------------------------{hostname}({ip})登录日志-----------------------------\n'
        result += f'{output}\n\n'
        switch_success += f'{hostname}({ip})\n'
        conn.send_command_timing('save f')
        conn.disconnect()
    except netmiko.NetmikoAuthenticationException:  ##防止登录失败 中止程序，登录失败可输出，因场景不同，暂无输出
        # print(hostname + "用户验证失败！")
        # switch_with_authentication_issue.append(ip)
        switch_with_authentication_issue += f'{hostname}({ip})\n'
    except netmiko.ssh_exception.NetmikoTimeoutException:
        # print(hostname + "目标不可达！")
        # switch_not_reachable.append(ip)
        switch_not_reachable += f'{hostname}({ip})\n'
    except ValueError:
        devicetype_error += f'{hostname}({ip})\n'
    return result