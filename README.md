# NetOpsCenter
基于vue+django开发的网络设备轻量化管理平台

![image](https://github.com/XiuziSeven/NetOpsCenter/assets/127931829/2eb5638c-8ab1-4c4e-92db-c856cd8df591)

### 功能介绍
https://zhuanlan.zhihu.com/p/655040014

### 安装python3
安装python3 作者开发环境 python3.9.5 其他版本也可以#安装过程不赘述
### 创建python3虚拟环境
```
cd /opt/
python3.9 -m venv py3
```
### 安装mariadb/mysql（版本无要求）
```
以mariadb5为例
yum -y install mariadb*
systemctl enable mariabd
systemctl start mariadb
```
### 数据库设置
```
进入数据库
create database django;
grant all on django.* TO 'django'@'localhost' identified by 'django';
ALTER DATABASE django DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;  修改数据库编码，解决中文乱码问题
```
### 拉取项目
```
cd /opt
git clone https://github.com/XiuziSeven/NetOpsCenter.git
```
### 安装python模块
```
source /opt/py3/bin/activate  #进入虚拟环境
cd /opt/NetOpsCenter/
pip install -r requirements.txt
```
### 初始化数据库
```
python manage.py makemigrations app
python manage.py migrate
```
### 创建默认管理员账号
python manage.py createsuperuser
### 启用服务
python manage.py  runserver 0.0.0.0:8000
然后访问 serverip:8000 即可

注：防火墙放行自行操作

![image](https://github.com/XiuziSeven/NetOpsCenter/assets/127931829/6176b2ed-1ab4-4c28-bb6b-f1ba11a22d5d)


