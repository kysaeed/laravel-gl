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
                // antialias: true,
            });
            renderer.shadowMap.enabled = true
            renderer.setPixelRatio(window.devicePixelRatio)
            renderer.setSize(width, height);

            return renderer
        },

        createCamera(width, height) {
            const camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 100);
            camera.position.set(4, 17.0, 40.0);
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
        scene.fog = new THREE.Fog(0xafafaf, 15, 150);

        const light = new THREE.AmbientLight(0xFFFFFF, 0.2);
        scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
        directionalLight.position.set(20, 12.0, 20);
        scene.add(directionalLight);

        // new THREE.SpotLight(色, 光の強さ, 距離, 照射角, ボケ具合, 減衰率)
        // const slight = new THREE.SpotLight(0xFFFFFF, 1, 1200, Math.PI / 4, 1);
        const spotLight = new THREE.SpotLight(0xffffff, 0.4, 200, Math.PI / 4, 0.3);
        spotLight.position.set(1, 7, 3)
        spotLight.castShadow = true
        spotLight.shadow.mapSize.width = 1024
        spotLight.shadow.mapSize.height = 1024
        scene.add(spotLight);

        // カメラを作成
        this.camera = this.createCamera(width, height)

        // const loader = new THREE.TextureLoader();
        // const texture = loader.load('kodomo.png');

        // const modelLoader = new ColladaLoader()
        const modelLoader = new GLTFLoader()

        let sky = null
        modelLoader.load('sky.glb', (glb) => {
            sky = glb.scene
            // sky.children.forEach((c) => {
            //     c.material.fog = false
            // })
// console.log('sky', sky)
            sky.scale.set(6, 6, 6)
            sky.position.set(0, -10, 0)
            scene.add(sky)
        })

        const kasaList = []
        modelLoader.load('kasa.glb', (glb) => {
            const kasa = glb.scene

            const t = new THREE.TextureLoader().load('hito.png')
        // for (let i = 0; i < 1200; i++) {
            const hitoMaterial = new THREE.SpriteMaterial({
                map: t,
                opacity: 1.0,
                color: 0xffffff,
                fog: true,
                transparent: true,
                // blending: THREE.AdditiveBlending,
                depthWrite: false, // デプスバッファへの書き込み可否
            })


            for (let i = 0; i < 10; i++) {
                const k = kasa.clone()
                k.scale.set(0.6, 0.6, 0.6)
                const kx = Math.random() * 20
                const ky = Math.random() * 20
                kasa.position.set(kx, 1, ky)
                scene.add(k)
                kasaList.push(k)

                const hitoSprite = new THREE.Sprite(hitoMaterial)
                hitoSprite.scale.set(1, 1, 1)
                hitoSprite.position.set(kx + 0.2, 1.1, ky)
                scene.add(hitoSprite)
            }

            kasa.position.set(0, 1.1, 0)
            kasa.scale.set(0.6, 0.6, 0.6)
            scene.add(kasa)
            kasaList.push(kasa)



        })

        const panelCount = 50

        const boxList = []
        modelLoader.load('building.glb', (glb) => {
            const model = glb.scene
            model.children[0].castShadow = true
            const boxRect = panelCount - 15
            for (let y = 0; y < boxRect; y++) {
                for (let x = 0; x < boxRect; x++) {
                    if (Math.random() < 0.2) {
                        const high = Math.random() * 2 + 1
                        let box = model.clone()
                        box.scale.set(1, high, 1)
                        box.position.set(x * 2 - boxRect, 0, y * 2 - boxRect)
                        scene.add(box)
                        boxList.push(box)
                    }
                }
            }
        });


        // 地面を作成
        // const plane = new THREE.Mesh(
        //     new THREE.PlaneGeometry(50, 50, 1, 1),
        //     // new THREE.MeshLambertMaterial({color: 0xFFFFFF})
        //     new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
        // )
        // plane.rotation.x = -(90 * Math.PI) / 180
        // plane.receiveShadow = true
        // plane.position.y = 0
        // scene.add(plane)

        const gr = []

        const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xafafaf, roughness: 0.5 })
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(panelCount * 2.0, panelCount * 2.0, 10, 10),
            planeMaterial
        )
        plane.receiveShadow = true
        // plane.position.x = -(panelCount )
        plane.position.y = 0
        // plane.position.z = -(panelCount )
        plane.rotation.x = -(90 * Math.PI) / 180
        scene.add(plane)

        // for (let y = 0; y < panelCount; y++) {
        //     const line = []
        //     for (let x = 0; x < panelCount; x++) {
        //         const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.5 })
        //         const plane = new THREE.Mesh(
        //             new THREE.PlaneGeometry(2.0, 2.0, 1, 1),
        //             planeMaterial
        //         )

        //         let c = Math.random()
        //         planeMaterial.color.r = 0.8
        //         planeMaterial.color.g = 0.8
        //         planeMaterial.color.b = 0.8

        //         plane.rotation.x = -(90 * Math.PI) / 180
        //         plane.position.set((x - (panelCount / 2)) * 2, 0, (y  - (panelCount / 2)) * 2)
        //         plane.receiveShadow = true

        //         plane.position.y = 0
        //         scene.add(plane)
        //         line.push({
        //             plane,
        //         })

        //     }
        //     gr.push(line)
        // }


        // const plane = new THREE.GridHelper(300, 10, 0x888888, 0x888888);
        // plane.position.y = -40;

        // knot
        // const meshKnot = new THREE.Mesh(
        //   new THREE.TorusKnotGeometry(3, 1, 100, 16),
        //   new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
        // );
        // meshKnot.position.set(0, 5, 0);
        // // 影を落とす
        // meshKnot.castShadow = true;
        // scene.add(meshKnot);


        // 箱を作成
        // const geometry = new THREE.BoxGeometry(400, 400, 400);
        // const material = new THREE.MeshNormalMaterial();
        // マテリアルにテクスチャーを設定
        // const material = new THREE.MeshStandardMaterial({
        //     map: texture
        // });
        // const box = new THREE.Mesh(geometry, material);
        // scene.add(box);


        const t = new THREE.TextureLoader().load('light.png')
        for (let i = 0; i < 1200; i++) {
            const spriteMaterial = new THREE.SpriteMaterial({
                map: t,
                opacity: 0.3,
                color: 0xffffff,
                fog: true,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false, // デプスバッファへの書き込み可否
            })


            const sprite = new THREE.Sprite(spriteMaterial)
            sprite.scale.set(2, 10.0, 2)
            sprite.position.x = 80 * (Math.random() - 0.5);
            sprite.position.y = 50 * Math.random();
            sprite.position.z = 80 * (Math.random() - 0.5);
            this.sprites.push(sprite)
            scene.add(sprite)
        }

        // 毎フレーム時に実行されるループイベントです
        const tick = () => {
            this.crot += 0.05
            const rad = (this.crot * Math.PI) / 180;
            this.camera.position.x = 40.0 * Math.sin(rad)
            this.camera.position.z = 40.0 * Math.cos(rad)
            this.camera.lookAt(new THREE.Vector3(0, 1, 0));

            // boxList.forEach((box) => {
            //     if (box) {
            //         box.rotation.y += 0.01;
            //     }
            // })


            this.sprites.forEach((s) => {
                s.position.y -= 0.2
                if (s.position.y < -4.0) {
                    s.position.y += 50.0
                }
            })

            // gr.forEach((line) => {
            //     line.forEach((g) => {
            //         let c = g.plane.material.color.g
            //         c += 0.001
            //         if (c > 0.74) {
            //             c = 0.7
            //         }

            //         g.plane.material.color.r = 0.7
            //         g.plane.material.color.g = c
            //         g.plane.material.color.b = 0.7
            //     })
            // })

            this.renderer.render(scene, this.camera); // レンダリング


            window.setTimeout(() => {
                requestAnimationFrame(tick);
            }, 0)
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
            crot: 0,
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