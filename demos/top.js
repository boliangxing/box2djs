demos.top = {};
//创建球体
demos.top.createBall = function (world, x, y, rad,zl, fixed) {
    //创建球体对象
    var ballSd = new b2CircleDef();
    //设置密度为1.0
    if (!fixed) ballSd.density = 10.5;
    //设置半径
    ballSd.radius = rad || 10;
    //设置弹性
    ballSd.restitution = 1;
    //创建刚体对象
    var ballBd = new b2BodyDef();
    //添加刚体形状
    ballBd.AddShape(ballSd);
    //设置位置
    ballBd.position.Set(x, y);
    //设置冲量与重力
    ballBd.linearVelocity = new b2Vec2(-1000.0, zl);
    //阻力
    ballBd.linearDamping = 0.02;

    //根据定义创建一个刚体
    return world.CreateBody(ballBd);
};

demos.top.createMj = function (world, x, y, rad, fixed) {
    console.log(y)
    var tsst=world.GetJointList();
    console.log(tsst);
    var ballMj = new b2MouseJointDef();
    ballMj.body1 = demos.top.createBall(world, x, y, 15,y-650);
    ballMj.body2 = demos.top.createBall(world, x, y, 15,y-650);
    world.CreateJoint(ballMj);

};
//创建多边形
demos.top.createPoly = function (world, x, y, points, fixed) {

    //创建多边形对象
    var polySd = new b2PolyDef();
    //设置密度为1.0
    if (!fixed) polySd.density = 0.1;
    //设置交数量
    polySd.vertexCount = points.length;
    //循环每个交点
    for (var i = 0; i < points.length; i++) {
        //设置交点坐标
        polySd.vertices[i].Set(points[i][0], points[i][1]);
    }
    //创建刚体对象
    var polyBd = new b2BodyDef();
    //添加刚体形状

    polyBd.AddShape(polySd);

    //设置位置
    polyBd.position.Set(x, y);
    //根据定义创建一个刚体
    return world.CreateBody(polyBd)
};

//初始化世界
demos.top.initWorld = function (world) {
    //调用创建球体
    //demos.top.createBall(world, 350, 100, 50, true);
    //调用创建三角形
    demos.top.createPoly(world, 100, 100, [[0, 0], [10, 30], [-10, 30]], true);
    demos.top.createPoly(world, 150, 150, [[0, 0], [10, 30], [-10, 30]], true);

    //创建世界中的盒子钟摆刚体 详细见demo_base  true为静态刚体
    var pendulum = demos.top.createPoly(world, 1000, 500, [[0, 0], [50, 0], [50, 80], [0, 80]]);
    //创建旋转关节
    var jointDef = new b2RevoluteJointDef();
    //设置主体1为一个盒子
    jointDef.body1 = pendulum;

    //设置一个空刚体
    jointDef.body2 = world.GetGroundBody();


    //设置盒子中心点
    jointDef.anchorPoint = pendulum.GetCenterPosition();
    //加入世界约束
    world.CreateJoint(jointDef);
    //继续加入钟摆
    //创建多边形
    var jointDef2 = new b2RevoluteJointDef();
    var seesaw = demos.top.createPoly(world, 350, 190, [[0, 0], [50, 0], [50, 80], [0, 80]]);
    //var seesaw = createBox(world, 300, 200, 20, 20, false);

    //将多边形填入到钟摆槽
    jointDef2.body1 = seesaw;
    //获取中心点
    jointDef2.anchorPoint = seesaw.GetCenterPosition();

    //创建车轮A
    var test1 = createBox(world, 336, 300, 10, 10, false);
       // demos.top.createPoly(world, 336, 100, [[0, 0], [10, 30], [-10, 30]]);

    //demos.top.createBall(world, 336, 285, 7);

    //将多边形填入到钟摆槽
    jointDef2.body2 = test1;
    //获取中心点
    jointDef2.anchorPoint = test1.GetCenterPosition();
    //加入世界约束
    world.CreateJoint(jointDef2);
    //创建车轮B
    var test2 = createBox(world, 416, 300, 10, 10, false);

        //demos.top.createBall(world, 416, 285, 7);
    //将多边形填入到钟摆槽
    jointDef2.body2 = test2;
    //获取中心点
    jointDef2.anchorPoint = test2.GetCenterPosition();
    //加入世界约束
    world.CreateJoint(jointDef2);
    //创建头部
    var test3 = createBox(world, 375, 170, 15, 15  , false)
    jointDef2.userData = 1;
        //demos.top.createBall(world, 376, 170, 20);
    //将多边形填入到钟摆槽
    jointDef2.body2 = test3;
    //获取中心点
    jointDef2.anchorPoint = test3.GetCenterPosition();

    //加入世界约束
    world.CreateJoint(jointDef2);




};
//向基类demo_base添加初始化好的世界
demos.InitWorlds.push(demos.top.initWorld);


