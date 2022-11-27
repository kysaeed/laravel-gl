class Rain {
    constructor(THREE, scene) {

        const RainCount = 1200

        this.sprites = []
        this.rains = []

        const t = new THREE.TextureLoader().load('light.png')

        const material = new THREE.PointsMaterial({
            size: 10,
            map: t,
            fog: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending,
            color: 0xffffff,
            transparent: true,
            depthWrite: false, // デプスバッファへの書き込み可否
        });
        const vertices = []

        for (let set = 0; set < 2; set++) {
            for (let i = 0; i < RainCount; i++) {
                vertices.push(
                    80 * (Math.random() - 0.5),
                    50 * Math.random(),
                    80 * (Math.random() - 0.5)
                )

            }
            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            const mesh = new THREE.Points(geometry, material);
            mesh.position.y = 50.0 * set
            this.rains.push(mesh)
            scene.add(mesh)
        }


    }

    update(THREE) {
        this.rains.forEach((r) => {
            r.position.y -= 0.2
            if (r.position.y < -50.0) {
                r.position.y = 50
            }
        })
    }
}

export default Rain