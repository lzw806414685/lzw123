<?php
    header('content-type:text/html;charset="utf-8"');

    $responseDate = array("code" => 0,"msg"=>"");
    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $createTime = $_POST['createTime'];

    //1、判断用户名是否存在
    if(!$username){
        $responseDate['code'] = 1;
        $responseDate['msg'] = "用户名不能为空";
        echo json_encode($responseDate);
        exit;
    }
    //判断密码是否存在
    if(!$password){
        $responseDate['code'] = 2;
        $responseDate['msg'] = "密码不能为空";
        echo json_encode($responseDate);
        exit;
    }


    //判断两次输入密码是否相同

    if($password!=$repassword){
        $responseDate['code'] = 3;
        $responseDate["msg"] = "两次输入不一样";
        echo json_encode($responseDate);
        exit;
    }


    //天龙八部
    //1、连接数据库
    $link = mysqli_connect("localhost","root","123456");

    //2、判断数据库是否连接成功
    if(!$link){
        $responseDate['code'] = 4;
        $responseDate['msg'] = "服务器忙";
        echo json_encode($responseDate);
        exit;
    }
    //3、设置访问字符集
    mysqli_set_charset($link,"utf8");

    //4、选择我们要访问的数据库

    mysqli_select_db($link,"qd2002");

    //5、准备sql注册
    $sql = "SELECT * FROM users WHERE username = '{$username}'";

    //mysql_result
    $res = mysqli_query($link,$sql);

    //取出一行
    $row = mysqli_fetch_assoc($res);

    //已经注册
    if($row){
        $responseDate['code'] = 5;
        $responseDate['msg'] = "用户名已经存在";
        echo json_encode($responseDate);
        exit;
    }
    //加密
    $str = md5((md5($password))."linzhongwei");

    $sql2 = "INSERT INTO users (username,password,createTime)VALUES('{$username}','{$str}','{$createTime}')";

    $res = mysqli_query($link,$sql2);
    if($res){
        $responseDate['msg'] = "注册成功";
        echo json_encode($responseDate);
        exit;
    }
    //关闭
    mysqli_close($link);
?>