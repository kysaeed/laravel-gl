<template>
    <div class="hello-box">
        <h1>やあ、世界！</h1>
        <div>hello world</div>
        <h2>カウンタ：{{ a }}</h2>
        <div>
            <button @click="add">add!</button>
        </div>

        <canvas ref="testCanvas" id="test-canvas" class="cnv"></canvas>
    </div>
</template>

<script>
import * as THREE from 'three';

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



        // サイズを指定
        const width = 960;
        const height = 540;

        // レンダラーを作成
        const renderer = new THREE.WebGLRenderer({
          canvas: this.$refs.testCanvas, //document.querySelector('#test-canvas'),
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        // シーンを作成
        const scene = new THREE.Scene();

        // カメラを作成
        const camera = new THREE.PerspectiveCamera(45, width / height);
        camera.position.set(0, 0, +1000);

        // 箱を作成
        const geometry = new THREE.BoxGeometry(400, 400, 400);
        const material = new THREE.MeshNormalMaterial();
        const box = new THREE.Mesh(geometry, material);
        scene.add(box);

        tick();

        // 毎フレーム時に実行されるループイベントです
        function tick() {
// console.log('a')
          box.rotation.y += 0.01;
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