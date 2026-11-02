document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const modalElement = document.getElementById('modalConfirmacion');
    const modalConfirmacion = new bootstrap.Modal(modalElement);

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        // Validaciones básicas
        if (!nombre || !email || !mensaje) {
            alert('Por favor complete todos los campos requeridos.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('email').classList.add('is-invalid');
            return;
        } else {
            document.getElementById('email').classList.remove('is-invalid');
        }

        // Construir mailto URL
        const mailtoSubject = encodeURIComponent(`Consulta Veterinaria de ${nombre}`);
        const mailtoBody = encodeURIComponent(`Hola PetCare,\n\nMi nombre es: ${nombre}\nCorreo de contacto: ${email}\n\nMensaje:\n${mensaje}`);
        const mailtoUrl = `mailto:contacto@petcaredominicana.com?subject=${mailtoSubject}&body=${mailtoBody}`;

        // Abrir cliente de correo y detectar el evento de ventana
        window.location.href = mailtoUrl;

        // Mostrar el modal tras disparar la solicitud de cliente de correo
        setTimeout(() => {
            modalConfirmacion.show();
            contactForm.reset();
        }, 500);
    });
});