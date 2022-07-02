import * as THREE from 'three';

import Experience from '../Experience';

export default class Preloader {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    // this.resources = this.experience.resources;

    this.items = {};

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1);
  }

  setMaterial() {
    this.overlayMaterial = new THREE.ShaderMaterial({
      wireframe: false,
      transparent: true,
      uniforms: {
        uAlpha: { value: 1 },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uAlpha;

        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
      `,
    });
    this.items.overlayMaterial = this.overlayMaterial;
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial);
    this.scene.add(this.mesh);
  }
}

// export default class Preloader {
//   constructor() {
//     this.experience = new Experience();
//     this.scene = this.experience.scene;
//     this.resources = this.experience.resources;

//     this.setGeometry();
//     this.setTextures();
//     this.setMaterial();
//     this.setMesh();
//   }

//   setGeometry() {
//     this.geometry = new THREE.CircleGeometry(5, 64);
//   }

//   setTextures() {
//     this.textures = {};

//     this.textures.color = this.resources.items.grassColorTexture;
//     this.textures.color.encoding = THREE.sRGBEncoding;
//     this.textures.color.repeat.set(1.5, 1.5);
//     this.textures.color.wrapS = THREE.RepeatWrapping;
//     this.textures.color.wrapT = THREE.RepeatWrapping;

//     this.textures.normal = this.resources.items.grassNormalTexture;
//     this.textures.normal.repeat.set(1.5, 1.5);
//     this.textures.normal.wrapS = THREE.RepeatWrapping;
//     this.textures.normal.wrapT = THREE.RepeatWrapping;
//   }

//   setMaterial() {
//     this.material = new THREE.MeshStandardMaterial({
//       map: this.textures.color,
//       normalMap: this.textures.normal,
//     });
//   }

//   setMesh() {
//     this.mesh = new THREE.Mesh(this.geometry, this.material);
//     this.mesh.rotation.x = -Math.PI * 0.5;
//     this.mesh.receiveShadow = true;
//     this.scene.add(this.mesh);
//   }
// }
