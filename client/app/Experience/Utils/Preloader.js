import * as THREE from 'three';

import Experience from '../Experience';

export default class Preloader {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

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
