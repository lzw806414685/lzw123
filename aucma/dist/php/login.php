<?php
    header('content-type:text/html;charset="utf-8"');

    $responseData = array("code" => 0, "msg" => "");

    $username = $_POST['username'];
    $password = $_POST['password'];


    if(!$username){
        $responseData['code'] = 1;
        $responseData['msg'] = "用户名不能为空";
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData['code'] = 2;
        $responseData['msg'] = "密码不能为空";
        echo json_encode($responseData);
        exit;
    }


    //天龙八部
    //1连接数据库
    $link = mysqli_connect("localhost","root","123456");
    //2、判断数据库是否链接成功
    if(!$link){
        $responseData['code'] = 4;
        $responseData['msg'] = "服务器忙";
        echo json_encode($responseData);
        exit;
    }
    //3、设置访问字符集
    mysqli_set_charset($link, "utf8");

    //4、选择我们要访问的数据库
    mysqli_select_db($link, "qd2002");

    //5、准备sql语句，进行登陆
    //加密
    $str = md5((md5($password))."linzhongwei");
    $sql = "SELECT * from users WHERE username='{$username}' AND password='{$str}'";


    //6、发送sql语句
    $res = mysqli_query($link, $sql);

    //查询，取出其中的行
    $row = mysqli_fetch_assoc($res);
    // var_dump($row);

    if($row){
        
        $responseData['msg'] = "登陆成功";
        echo json_encode($responseData);
        
    }else{
        $responseData['code'] = 5;
        $responseData['msg'] = "用户名或密码错误";
        echo json_encode($responseData);
        exit;
    }

    mysqli_close($link);
?>