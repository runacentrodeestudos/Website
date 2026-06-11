// Three.js plasma shader for contact section
let plasmaScene, plasmaCamera, plasmaRenderer, plasmaMaterial;

function initPlasmaShader() {
    const container = document.getElementById('plasma-container');
    if (!container) return;

    // Scene setup
    plasmaScene = new THREE.Scene();

    // Camera setup (orthographic for 2D effect)
    const aspect = container.clientWidth / container.clientHeight;
    plasmaCamera = new THREE.OrthographicCamera(
        -5 * aspect, 5 * aspect,
        5, -5,
        0.1, 1000
    );
    plasmaCamera.position.z = 1;

    // Renderer setup
    plasmaRenderer = new THREE.WebGLRenderer({ antialias: true });
    plasmaRenderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(plasmaRenderer.domElement);

    // Create plasma shader material
    plasmaMaterial = createPlasmaShaderMaterial();

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(20 * aspect, 20);
    const plane = new THREE.Mesh(geometry, plasmaMaterial);
    plasmaScene.add(plane);

    // Handle resize
    window.addEventListener('resize', onPlasmaResize, false);

    // Start animation
    animatePlasma();
}

function onPlasmaResize() {
    const container = document.getElementById('plasma-container');
    if (!container) return;

    const aspect = container.clientWidth / container.clientHeight;
    
    plasmaCamera.left = -5 * aspect;
    plasmaCamera.right = 5 * aspect;
    plasmaCamera.updateProjectionMatrix();
    
    plasmaRenderer.setSize(container.clientWidth, container.clientHeight);
}

function animatePlasma() {
    requestAnimationFrame(animatePlasma);
    
    updateShaderTime(plasmaMaterial, performance.now());
    
    plasmaRenderer.render(plasmaScene, plasmaCamera);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPlasmaShader);
