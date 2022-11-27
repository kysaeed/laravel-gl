class Grand {
    constructor(THREE, scene) {
        // this.THREE = THREE


        /*
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 50, 1, 1),
            // new THREE.MeshLambertMaterial({color: 0xFFFFFF})
            new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
        )
        plane.rotation.x = -(90 * Math.PI) / 180
        plane.receiveShadow = true
        plane.position.y = 0
        scene.add(plane)
        */

        const panelCount = 50

        const gr = []
        // /*
        // const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xafafaf, roughness: 0.5 })
        // const plane = new THREE.Mesh(
        //     new THREE.PlaneGeometry(panelCount * 2.0, panelCount * 2.0, 10, 10),
        //     planeMaterial
        // )
        // plane.receiveShadow = true
        // // plane.position.x = -(panelCount )
        // plane.position.y = 0
        // // plane.position.z = -(panelCount )
        // plane.rotation.x = -(90 * Math.PI) / 180
        // scene.add(plane)
        // */

        for (let y = 0; y < panelCount; y++) {
            const line = []
            for (let x = 0; x < panelCount; x++) {
                const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.5 })
                const plane = new THREE.Mesh(
                    new THREE.PlaneGeometry(2.0, 2.0, 1, 1),
                    planeMaterial
                )
                let c = Math.random()
                planeMaterial.color.r = 0.8
                planeMaterial.color.g = 0.8 + (0.2 * Math.random())
                planeMaterial.color.b = 0.8
                plane.rotation.x = -(90 * Math.PI) / 180
                plane.position.set((x - (panelCount / 2)) * 2, 0, (y  - (panelCount / 2)) * 2)
                // plane.receiveShadow = true
                plane.position.y = 0
                scene.add(plane)
                line.push({
                    plane,
                })
            }
            gr.push(line)
        }

        this.gr = gr
    }


    update(THREE) {
        // this.gr.forEach((line) => {
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
    }
}

export default Grand