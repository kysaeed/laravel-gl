class Rain {
    constructor(THREE, scene) {

        const RainCount = 1200

        this.sprites = []

        const t = new THREE.TextureLoader().load('light.png')

    const spriteMaterial = new THREE.SpriteMaterial({
        map: t,
        opacity: 0.3,
        color: 0xffffff,
        fog: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false, // デプスバッファへの書き込み可否
    })
    for (let i = 0; i < RainCount; i++) {
            const sprite = new THREE.Sprite(spriteMaterial)
            sprite.scale.set(2, 10.0, 2)
            sprite.position.x = 80 * (Math.random() - 0.5);
            sprite.position.y = 50 * Math.random();
            sprite.position.z = 80 * (Math.random() - 0.5);
            this.sprites.push(sprite)
            scene.add(sprite)
        }
    }

    update(THREE) {
        this.sprites.forEach((s) => {
            s.position.y -= 0.2
            if (s.position.y < -4.0) {
                s.position.y += 50.0
            }
        })
    }
}

export default Rain