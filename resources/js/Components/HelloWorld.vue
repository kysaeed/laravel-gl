<template>
    <div
        ref="bg"
        class="hello-bg"
    >

        <canvas
            ref="testCanvas"
            class="cnv">
        </canvas>

        <div class="hello-box">
            <h1>やあ、世界！</h1>
            <div>hello world</div>
        </div>
    </div>

</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'

export default {
    name: 'hello-world',
    props: {
        startCount: {
            type: Number,
            default: 0,
        },
    },
    methods: {

        onWindowResize() {


        },

        createRenderer(width, height) {
            // レンダラーを作成
            const renderer = new THREE.WebGLRenderer({
            canvas: this.$refs.testCanvas,
            //   antialias: true,
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);

            return renderer
        },

        createCamera(width, height) {
            const camera = new THREE.PerspectiveCamera(45, width / height);
            camera.position.set(0, 2.8, 6.0);
            camera.lookAt(new THREE.Vector3(0, 1, 0));
            // camera.lookAt(0, 0, 0)
            return camera
        },
    },

    mounted() {
        const r = this.$refs.bg.getBoundingClientRect()
        // console.log(r)

        // サイズを指定
        const width = r.width;
        const height = r.height;

        this.renderer = this.createRenderer(width, height)


        // シーンを作成
        const scene = new THREE.Scene();

        const light = new THREE.AmbientLight(0xFFFFFF, 0.2);
        scene.add(light);


        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // カメラを作成

        this.camera = this.createCamera(width, height)

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


        const spriteMaterial = new THREE.SpriteMaterial({
            map: new THREE.TextureLoader().load('light.png'),
            // opacity: 0.8,
            fog: true,
            // transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false, // デプスバッファへの書き込み可否
        })

        for (let i = 0; i < 1000; i++) {
            const sprite = new THREE.Sprite(spriteMaterial)
            sprite.position.x = 100 * (Math.random() - 0.5);
            sprite.position.y = 100 * Math.random() - 40;
            sprite.position.z = 100 * (Math.random() - 0.5);
            this.sprites.push(sprite)
            scene.add(sprite)
        }

        // 地面を作成
        const plane = new THREE.GridHelper(300, 10, 0x888888, 0x888888);
        plane.position.y = -40;
        scene.add(plane);


        // 箱を作成
        // const geometry = new THREE.BoxGeometry(400, 400, 400);
        // const material = new THREE.MeshNormalMaterial();
        // マテリアルにテクスチャーを設定
        // const material = new THREE.MeshStandardMaterial({
        //     map: texture
        // });
        // const box = new THREE.Mesh(geometry, material);
        // scene.add(box);



        // 毎フレーム時に実行されるループイベントです
        const tick = () => {
// console.log('a')
            if (box) {
                box.rotation.y += 0.01;
                box.position.set(0, 0, 0)

            }

            this.sprites.forEach((s) => {
                s.position.y -= 0.1
                if (s.position.y < -10.0) {
                    s.position.y += 100.0
                }
            })

            this.renderer.render(scene, this.camera); // レンダリング


            requestAnimationFrame(tick);
        }

        tick();

        this.$nextTick(() => {

            new ResizeObserver((e) => {
                if (e.length) {
                    const resizeState = e[0]
                    const width = resizeState.contentRect.width;
                    const height = resizeState.contentRect.height;

                    this.renderer.setSize(width, height);

                    // カメラのアスペクト比を正す
                    this.camera.aspect = width / height;
                    this.camera.updateProjectionMatrix();

                }
            }).observe(this.$refs.bg)


        })


    },
    data() {
        // const scene = new THREE.Scene()
        // const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        // const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
        // const ambientlight = new THREE.AmbientLight(0xFFFFFF, 0.5)

        return {
            renderer: null,
            camera: null,
            sprites: [],
        }
    },
}
</script>

<style lang="scss" scoped>
.hello {
    &-bg {
        position: relative;
        width: 100%;
        height: 100%;
    }
    &-box {
        position: absolute;
        top: 0px;
        left: 0xp;

        color: #ffffff;
        // background: black;
        margin: 20px;
        padding: 10px;
        // border: 1px solid #101010;
        // border-radius: 10px;
    }
}

.cnv {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid black;
}
</style>