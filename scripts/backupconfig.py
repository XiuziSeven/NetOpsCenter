from app.models import Devices,DeviceUser,DeviceBrand,DevicesGroup
import netmiko
from netmiko import ConnectHandler
from multiprocessing.dummy import Pool as ThreadPool
import time
import os


def getdevicesid(devicegroupid):
    deviceid = DevicesGroup.objects.values_list('devices', flat=True).filter(id=devicegroupid)
    return list(deviceid)

def backupconfig(backtype,deviceid='None',devicegroupid='None'):
    if deviceid == 'None':
        deviceid = getdevicesid(devicegroupid)
    else:
        deviceid = deviceid
    result = defconfig(deviceid,backtype)
    timetag = time.strftime("%Y%m%d-%H:%M:%S", time.localtime())
    results = '时间：'+ timetag +'\n'
    if switch_success!= '':
        results += '备份成功:\n'
        results += switch_success
    if devicetype_error != '':
        results += 'netmiko_type字段错误:\n'
        results += devicetype_error
    if switch_not_reachable != '':
        results += '登录失败设备（不可达）:\n'
        results += switch_not_reachable
    if switch_with_authentication_issue != '':
        results += '登录失败设备（认证失败）:\n'
        results += switch_with_authentication_issue
    if backtype == 'ST':
        logname = "data/log/backconf/cron.log"
        with open(logname, 'r') as f:
            existing_content = f.read()
        all_content = results + existing_content
        wr = open(logname, 'w')
        wr.write(all_content)
        wr.close()
        results1 = {'status':'success',
            'message':'计划任务完成',
            'log': result}
    if backtype == 'OT':
        if switch_success == '':
            results1 = {'status':'error',
                       'message':'备份失败,请检查用户及设备类型'}
        else:
            results1 = {'status':'success',
                       'message':'备份成功',
                       'log': results}

    return results1

def defconfig(deviceid,backtype):
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
    result = multithred(50,logindev,devlist,backtype)



def multithred(numbers,defname,devlist,backtype): #并发
    pool = ThreadPool(numbers)  # 并发进程数 默认为核心数，可以写多条
    results = pool.map(lambda dev: defname(dev, backtype), devlist)
    pool.close()
    pool.join()

    
def logindev(devlist,backtype): #登录设备
    global switch_with_authentication_issue, switch_not_reachable, switch_success,devicetype_error
    switch_with_authentication_issue = ''
    switch_not_reachable = ''
    switch_success =''
    devicetype_error = ''
    if backtype == 'ST':
        timetag = time.strftime("%Y%m%d", time.localtime())
    if backtype == 'OT':
        timetag = time.strftime("%Y%m%d-%H:%M:%S", time.localtime())
        
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
                              port=ssh_port,
                              username=admin,
                              password=devpasswd,
                              conn_timeout = 100,
                              )
        """命令输入如下界面，无需输入sys 和 return，会自动进入配置模式，配置结束会自动退出"""
        if devtype == 'hp_comware':  ##H3C
            output = conn.send_command_timing('screen-length disable\n dis cu ')
            conn.send_command_timing('save f')
        elif devtype == 'huawei': ##华为
            output = conn.send_command_timing('screen-length 0 temporary\n dis cu')
        elif devtype == 'juniper_junos': #juniper
            output = conn.send_command_timing('show configuration | display set | no-more')
        switch_success += f'{hostname}({ip})\n'
        conn.disconnect()
        logname = "data/backup/" + ip + "/" + hostname + "_" + timetag + ".log" #定义备份文件名
        time.sleep(2)
        try:  ###创建日期文件夹
            os.mkdir("data/backup/" + ip + "/")
        except OSError:
            pass
        wr = open(logname, 'a' or 'w')
        wr.write(output)
        wr.close()
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
