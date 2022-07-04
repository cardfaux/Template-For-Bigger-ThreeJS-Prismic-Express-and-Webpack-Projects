import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';

import EventEmitter from './EventEmitter';
import Experience from '../Experience';

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.experience = new Experience();

    // Options
    this.sources = sources;

    // Setup
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.preloader = this.experience.preloader;
    this.loadingBarElement = document.querySelector('.loading-bar');

    this.setLoadingManager();
    this.setLoaders();
    this.startLoading();
  }

  // Methods
  setLoadingManager() {
    this.loadingManager = new THREE.LoadingManager(
      () => {
        gsap.delayedCall(0.5, () => {
          gsap.to(this.preloader.items.overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 });

          this.loadingBarElement.classList.add('ended');
          this.loadingBarElement.style.transform = '';
        });
      },
      (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal;
        this.loadingBarElement.style.transform = `scaleX(${progressRatio})`;
      },
    );
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader(this.loadingManager);
    this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager);
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager);
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === 'texture') {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === 'cubeTexture') {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) {
      this.trigger('ready');
    }
  }
}
