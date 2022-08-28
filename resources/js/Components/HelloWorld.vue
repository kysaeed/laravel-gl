<template>
    <div class="hello-box">
        <h1>やあ、世界！</h1>
        <div>hello world</div>

        <canvas ref="testCanvas" class="cnv"></canvas>
<!--

        <h2>カウンタ：{{ a }}</h2>
        <div>
            <button @click="add">add!</button>
        </div>
 -->
    </div>
</template>

<script>
import * as THREE from 'three';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// console.log('ColladaLoader', ColladaLoader)

export default {
    name: 'hello-world',
    props: {
        startCount: {
            type: Number,
            default: 0,
        },
    },
    methods: {
        add() {
            this.a++
        },
    },

    mounted() {

// console.log(THREE.Loader)
console.log(new ColladaLoader())


        // サイズを指定
        const width = 960;
        const height = 540;

        // レンダラーを作成
        const renderer = new THREE.WebGLRenderer({
          canvas: this.$refs.testCanvas,
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        // シーンを作成
        const scene = new THREE.Scene();

        const light = new THREE.AmbientLight(0xFFFFFF, 0.2);
        scene.add(light);


        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // カメラを作成
        const camera = new THREE.PerspectiveCamera(45, width / height);
        camera.position.set(0, 2.8, 6.0);
        camera.lookAt(new THREE.Vector3(0, 1, 0));
        // camera.lookAt(0, 0, 0)

        // const loader = new THREE.TextureLoader();
        // const texture = loader.load('kodomo.png');

        // const modelLoader = new ColladaLoader()
        const modelLoader = new GLTFLoader()

        let box = null
        modelLoader.load('box.glb', (glb) => {
            // 読み込み後に3D空間に追加
            const model = glb.scene
            scene.add(model)
            box = model
        });

        // 箱を作成
        // const geometry = new THREE.BoxGeometry(400, 400, 400);
        // const material = new THREE.MeshNormalMaterial();
        // マテリアルにテクスチャーを設定
        // const material = new THREE.MeshStandardMaterial({
        //     map: texture
        // });
        // const box = new THREE.Mesh(geometry, material);
        // scene.add(box);


        tick();

        // 毎フレーム時に実行されるループイベントです
        function tick() {
// console.log('a')
            if (box) {
                box.rotation.y += 0.01;
                box.position.set(0, 0, 0)

            }

            renderer.render(scene, camera); // レンダリング

            requestAnimationFrame(tick);
        }


    },
    data() {
        // const scene = new THREE.Scene()
        // const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        // const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
        // const ambientlight = new THREE.AmbientLight(0xFFFFFF, 0.5)

        return {
            a: this.startCount,
        }
    },
}
</script>

<style lang="scss" scoped>
.hello-box {
    position: relative;
    margin: 20px;
    padding: 10px;
    border: 1px solid #101010;
    border-radius: 10px;
}

.cnv {
    position: relative;
    width: 100%;
    height: 540px;
    border: 1px solid black;
}
</style>