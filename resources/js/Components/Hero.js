class Hero {
    constructor(THREE, scene, modelLoader) {

        const kasaList = []
        modelLoader.load('kasa.glb', (glb) => {
            const kasa = glb.scene

            const t = new THREE.TextureLoader().load('hito.png')
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

    }

    update(THREE) {


    }

}

export default Hero