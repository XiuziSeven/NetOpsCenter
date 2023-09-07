import time
from app.models import Devices,DeviceUser,DeviceBrand,DevicesGroup
import netmiko
from netmiko import ConnectHandler
from multiprocessing.dummy import Pool as ThreadPool
import re



def findmac(devlist,mac_add):
    re1 = r'..\-..\-..\-..\-..\-..'
    mac_add = mac_add.lower()
    if re.match(re1, mac_add):
        print('匹配')
        mac = list(mac_add)
        mac.pop(2)
        mac.pop(7)
        mac.pop(12)
        mac_add = ''.join(mac)
    devip = []
    interfacetab = []
    targetid = []
    jieguo = []
    cmd = "dis mac-add | in " + mac_add
    def ssh_session(devlist):
        global switch_with_authentication_issue, switch_not_reachable, switch_success,devicetype_error
        switch_with_authentication_issue = ''
        switch_not_reachable = ''
        switch_success =''
        devicetype_error = ''
        try:
            # print('#############开始' + now)
            line2 = devlist.replace("\n", "")
            # print(line2)
            list = line2.split(",")
            hostname = list[0]
            devtype = list[1]
            ip = list[2]
            admin = list[3]
            devpasswd = list[4]
            id = list[5]
            conn = ConnectHandler(device_type=devtype,
                                  host=ip,
                                  username=admin,
                                  password=devpasswd,
                                  )
            # time.sleep(1)
            # print(f'已成功登陆交换机{hostname}')
            if devtype == 'hp_comware':
                # print(cmd)
                output = conn.send_command(cmd)
                # print(output)
                if mac_add in output:
                    mac_table = str(output).split()
                    # print(mac_table)
                    interface = mac_table[3]
                    cmd2 = "dis cu int " + interface
                    output2 = conn.send_command(cmd2)
                    # print(output2)
                    if "port link-type trunk" not in output2:
                        if 'return' in output2:
                            # print('目标在' + ip + interface)
                            weizhi = f'MAC所在位置：{ip}  {interface}'
                            devip.append(ip)
                            jieguo.append(weizhi)
                            interfacetab.append(interface)
                            targetid.append(id)
            elif devtype == 'huawei':  ###可添加其他品牌交换机，注意修改命令
                output = conn.send_command(cmd)
                mactab = str(output).split('\n')  # 以行为单位，分割成列表
                for i in mactab:  # 遍历列表，用于匹配 mac与接口 数据所在行
                    if mac_add in i:  # 匹配mac
                        mac_table = str(i).split()  # 将该行分割成列表
                        for ii in mac_table:  # 遍历数据
                            if ('GE' or 'XGE') in ii:  # 匹配接口数据
                                # 定义接口，并替换字符，如：华为无法直接使用int GE0/0/1进入接口，可使用int g0/0/0进入接口
                                interface = ii.replace('GE', 'g').replace('XGE', 'ten')
                                # print(interface) #排错使用
                                cmd2 = "dis cu int " + interface
                                output2 = conn.send_command(cmd2)
                                if 'return' in output2:  # 防止无回写
                                    if "port link-type trunk" not in output2:  # 排除 trunk接口
                                        if 'eth-trunk' not in output2:  # 排除 聚合接口
                                        #    print('目标在' + ip + interface)
                                            weizhi = f'MAC所在位置：{ip}  {interface}'
                                            devip.append(ip)
                                            jieguo.append(weizhi)
                                            interfacetab.append(interface)
                                            targetid.append(id)

            # elif devtype == 'juniper_junos':  ###可添加其他品牌交换机，注意修改命令
            #     output = conn.send_command_timing('show configuration | display set | no-more')
            # print('结束' + now)
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
    pool = ThreadPool(100)  # 并发，1核1线程
    pool.map(ssh_session, devlist)
    pool.close()
    pool.join()
    jieguo = str(jieguo)
    if devip:
        devip = devip[0]
    if interfacetab:
        interfacetab = interfacetab[0]
    if devicetype_error != '':
        jieguo += '\n--------------netmiko_type字段错误--------------\n\n'
        jieguo += devicetype_error
    if switch_not_reachable != '':
        jieguo += '\n--------------登录失败设备（不可达）--------------\n\n'
        jieguo += switch_not_reachable
    if switch_with_authentication_issue != '':
        jieguo += '\n--------------登录失败设备（认证失败）--------------\n\n'
        jieguo += switch_with_authentication_issue
    context = {}
    context['jieguo'] = jieguo
    context['dev'] = devip
    context['interface'] = interfacetab
    context['targetid'] =targetid
    context['status'] = 'success'
    context['message'] = '查询成功'
    return context


def findmac_main(devicegroupid,mac_add):
    devlist=[]
    deviceid = DevicesGroup.objects.values_list('devices', flat=True).filter(id=devicegroupid)
    for i in deviceid:
        devicename = Devices.objects.values_list('name', flat=True).get(id=i)
        ip = Devices.objects.values_list('ip', flat=True).get(id=i)
        devicebrandid = Devices.objects.values_list('device_brand', flat=True).get(id=i)
        devicebrand = DeviceBrand.objects.values_list('netmikotype', flat=True).get(id=devicebrandid)
        try:           
            userid = Devices.objects.values_list('device_user', flat=True).get(id=i)
            username = DeviceUser.objects.values_list('username', flat=True).get(id=userid)
            password = DeviceUser.objects.values_list('password', flat=True).get(id=userid)
        except:
            username = ''
            password = ''
        a=f'{devicename},{devicebrand},{ip},{username},{password},{i}'
        devlist.append(a)
    result = findmac(devlist,mac_add)
    return result

def findmac_changeinterface(deviceid,interface,changetype):
    try:
        devicename = Devices.objects.values_list('name', flat=True).get(id=deviceid)
        ip = Devices.objects.values_list('ip', flat=True).get(id=deviceid)
        devicebrandid = Devices.objects.values_list('device_brand', flat=True).get(id=deviceid)
        devicebrand = DeviceBrand.objects.values_list('netmikotype', flat=True).get(id=devicebrandid)
        try:           
            userid = Devices.objects.values_list('device_user', flat=True).get(id=deviceid)
            username = DeviceUser.objects.values_list('username', flat=True).get(id=userid)
            password = DeviceUser.objects.values_list('password', flat=True).get(id=userid)
        except:
            username = ''
            password = ''
        a=f'{devicename},{devicebrand},{ip},{username},{password}'
        print(a)
        line2 = a.replace("\n", "")
        list = line2.split(",")
        hostname = list[0]
        devtype = list[1]
        ip = list[2]
        admin = list[3]
        devpasswd = list[4]
        conn = ConnectHandler(device_type=devtype,
                              host=ip,
                              username=admin,
                              password=devpasswd,
                              )
        cmd1 = f'int {interface}'
        cmd2 = f'dis mac-add | in {interface}'
        if changetype == "1":#802.1X
            cmd = [cmd2,
                   cmd1,
                   'undo dot1x handshake',
                   'dot1x mandatory-domain archosaur',
                   'undo dot1x multicast-trigger',
                   'dot1x unicast-trigger',
                   'dot1x guest-vlan 5',
                   'dot1x auth-fail vlan 5',
                   'dot1x',
                   'undo mac-authentication',
                   'shutdown',
                   'undo shutdown',
                   'save f'
                   ]
        elif changetype == "2":#哑终端
            cmd = [cmd2,
                   cmd1,
                   'mac-authentication ',
                   'undo dot1x',
                   'mac-authentication domain mac.zulong.com',
                   'mac-authentication guest-vlan 5',
                   'mac-authentication critical vlan 5',
                   'shutdown',
                   'undo shutdown',
                   'save f'
                   ]
        elif changetype == "3":#双认证方式
            cmd = [cmd2,
                   cmd1,
                   'undo dot1x guest-vlan',
                   'undo dot1x auth-fail vlan ',
                   'mac-authentication',
                   'mac-authentication domain mac.zulong.com',
                   'mac-authentication guest-vlan 5',
                   'mac-authentication critical vlan 5',
                   'dot1x',
                   'shutdown',
                   'undo shutdown',
                   'save f'
                   ]
        elif changetype == "4":#上海新接入
            cmd = [cmd2,
                   cmd1,
                   'undo dot1x handshake',
                   'port hybrid vlan 1  5 untagged',
                   'undo port hybrid vlan 160 60',
                   'port hybrid pvid vlan 5',
                   'undo dot1x handshake',
                   'dot1x mandatory-domain archosaur',
                   'undo dot1x multicast-trigger',
                   'dot1x unicast-trigger',
                   'dot1x',
                   'mac-authentication',
                   'mac-authentication domain mac.zulong.com',
                   'mac-authentication guest-vlan 5',
                   'mac-authentication critical vlan 5',
                   'shutdown',
                   'undo shutdown',
                   'save f',
                   cmd1,
                   ]
        elif changetype == "5":#成都新接入
            cmd = [cmd2,
                   cmd1,
                   'undo dot1x handshake',
                   'undo dot1x handshake',
                   'dot1x mandatory-domain archosaur',
                   'undo dot1x multicast-trigger',
                   'dot1x unicast-trigger',
                   'dot1x',
                   'mac-authentication',
                   'mac-authentication domain mac.zulong.com',
                   'mac-authentication guest-vlan 160',
                   'mac-authentication critical vlan 160',
                   'shutdown',
                   'undo shutdown',
                   'save f',
                   cmd1,
                   ]
        elif changetype == "6":#测试
            cmd = ['dis clock'
                   ]
        if devtype == 'hp_comware':
            output1 = conn.send_config_set(config_commands=cmd)
            time.sleep(5)
            output2 = conn.send_config_set(cmd2)
        elif devtype == 'juniper_junos':  ###可添加其他品牌交换机，注意修改命令
            output = conn.send_command_timing('show configuration | display set | no-more')
        # print('结束' + now)
        conn.disconnect()
        output = output1 + output2
        results1 = {'status':'success',
                    'message':'查找完成',
                    'results': output}
        return results1
    except Exception  as e:
        print(e)
        results1 = {'status':'error',
                    'message':'内部错误'}
        return results1