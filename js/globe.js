// Three.js scene setup for antique globe
let scene, camera, renderer, globe, controls;

function initGlobe() {
    const container = document.getElementById('globe-container');
    if (!container) return;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Camera setup
    camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 1.6, 4);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    // Orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;

    // Load antique globe
    const loader = new THREE.GLTFLoader();
    loader.load(
        'glb/antique_globe.glb',
        function (gltf) {
            globe = gltf.scene;
            
            // Position and scale the globe
            globe.position.set(0, 1, 0);
            
            // Calculate appropriate scale based on bounding box
            const box = new THREE.Box3().setFromObject(globe);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const desiredSize = 0.04; // Desired globe size (changed from 2 to 1.5)
            const scale = desiredSize / maxDim;
            globe.scale.multiplyScalar(scale);
            
            // Center the globe
            const center = box.getCenter(new THREE.Vector3());
            globe.position.sub(center.multiplyScalar(scale));
            globe.position.y = 1; // Place on ground level
            
            // Enable shadows
            globe.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            
            scene.add(globe);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('Error loading globe:', error);
            
            // Fallback: create a simple sphere if globe fails to load
            const geometry = new THREE.SphereGeometry(1, 32, 32);
            const material = new THREE.MeshPhongMaterial({ 
                color: 0x8B4513,
                emissive: 0x2F1F0F,
                emissiveIntensity: 0.1
            });
            globe = new THREE.Mesh(geometry, material);
            globe.position.set(0, 1, 0);
            globe.castShadow = true;
            globe.receiveShadow = true;
            scene.add(globe);
        }
    );

    
    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Start animation
    animate();
}

function onWindowResize() {
    const container = document.getElementById('globe-container');
    if (!container) return;

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the globe slowly
    if (globe) {
        globe.rotation.y += 0.005;
    }

    controls.update();
    renderer.render(scene, camera);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initGlobe);
