    /* PHISICS */
    const havokInstance = await HavokPhysics({
        locateFile: () => "/HavokPhysics.wasm",
      });
      const hk = new HavokPlugin(true, havokInstance);
      scene.enablePhysics(new Vector3(0, -9.8, 0), hk);
  
      player = MeshBuilder.CreateBox(
        "player",
        { width: 0.9, height: 1.8, depth: 1 },
        scene
      );
      player.position.y = 2;
      player.position.x = -4;
  
      // player
      //https://babylonjs.medium.com/character-controller-with-physics-v2-1df5d8b0d244
      // https://playground.babylonjs.com/#GZYGLJ#21
  
      const playerPhysicsAggregate = new PhysicsAggregate(
        player,
        PhysicsShapeType.BOX,
        { mass: 3, friction: 1, restitution: 0 },
        scene
      );
      new PhysicsAggregate(voxelMesh, PhysicsShapeType.BOX, { mass: 0 }, scene);
      const linearVelocity = new Vector3(1.75, -0.6, 0); // Change this to the desired velocity vector
  
      const onRender = async (scene: Scene) => {
        if (player?.physicsBody) {
          player.physicsBody.setLinearVelocity(linearVelocity);
        }
      };