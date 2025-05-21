// Ver detalles completos del equipo (función corregida)
function verDetallesEquipo(id) {
    try {
        const equipo = equipos.find(e => e.id === id);
        if (!equipo) {
            console.error("Equipo no encontrado:", id);
            return;
        }
        
        const contenedor = document.getElementById('detalles-equipo');
        if (!contenedor) {
            console.error("Contenedor de detalles no encontrado");
            return;
        }
        
        let html = generarHtmlDetalles(equipo);
        contenedor.innerHTML = html;
        
        // Obtener y configurar botones de cierre
        const btnDetallesClose = document.querySelectorAll('.detalles-close');
        btnDetallesClose.forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('modal-detalles').style.display = 'none';
            });
        });
        
        // Configurar botón de impresión
        const btnPrintDetalles = document.getElementById('btn-print-detalles');
        if (btnPrintDetalles) {
            btnPrintDetalles.onclick = () => {
                imprimirDetalles();
            };
        }
        
        // Mostrar modal
        const modalDetalles = document.getElementById('modal-detalles');
        if (modalDetalles) {
            modalDetalles.style.display = 'flex';
        }
    } catch (error) {
        console.error("Error mostrando detalles del equipo:", error);
        mostrarMensaje('Error al mostrar detalles', 'error');
    }
}

// Generar HTML para los detalles del equipo
function generarHtmlDetalles(equipo) {
    if (!equipo) return '';
    
    let html = `
        <!-- Información básica -->
        <div class="detalles-seccion">
            <div class="detalles-titulo">Información Básica</div>
            <div class="detalles-contenido">
                <div class="detalles-campo">
                    <div class="detalles-etiqueta">ID de Orden:</div>
                    <div class="detalles-valor">${equipo.id || ''}</div>
                </div>
                <div class="detalles-campo">
                    <div class="detalles-etiqueta">Fecha de Ingreso:</div>
                    <div class="detalles-valor">${formatearFecha(equipo.fecha)}</div>
                </div>
                <div class="detalles-campo">
                    <div class="detalles-etiqueta">Hora de Ingreso:</div>
                    <div class="detalles-valor">${equipo.hora || 'No registrada'}</div>
                </div>
                <div class="detalles-campo">
                    <div class="detalles-etiqueta">Estado Actual:</div>
                    <div class="detalles-valor">
                        <span class="status-badge status-${clasePorEstado(equipo.estado)}">${equipo.estado || 'Recibido'}</span>
                    </div>
                </div>
                ${equipo.tecnico ? `
                <div class="detalles-campo">
                    <div class="detalles-etiqueta">Técnico Asignado:</div>
                    <div class="detalles-valor">${equipo.tecnico}</div>
                </div>
                ` : ''}
            </div>
        </div>
        
        <!-- Datos del cliente -->
        <div class="detalles-seccion">
            <div class="detalles-titulo">Datos del Cliente</div>
            <div class="detalles-contenido">
                <div class="detalles-campo">
                    <div class="detalles-etiqueta">Nombre:</div>
                    <div class="detalles-valor">${equipo.nombreCliente || ''}</div>
                </div>
                <div class="detalles-campo">
                    <div class="detalles-etiqueta">Identificación:</div>
                    <div class="detalles-valor">${equipo.tipoIdentificacion || 'CC'} ${equipo.numeroIdentificacion || 'No registrada'}</div>
                </div>
                <div class="detalles-campo">
                    <div class="detalles-etiqueta">Celular:</div>
                    <div class="detalles-valor">${equipo.celular || ''}</div>
                </div>
                <div class="detalles-campo">
                    <div class="detalles-etiqueta">Email:</div>
                    <div class="detalles-valor">${equipo.email || 'No registrado'}</div>
                </div>
                <div class="detalles-campo">
                    <div class="detalles-etiqueta">Dirección:</div>
                    <div class="detalles-valor">${equipo.direccion || 'No registrada'}</div>
                </div>
            </div>
        </div>
        
        <!-- Datos del equipo -->
        <div class="detalles-seccion">
            <div class="detalles-titulo">Datos del Equipo</div>
            <div class="detalles-contenido">
                <div class="detalles-campo">
                    <div class="detalles-etiqueta">Tipo de Equipo:</div>
                    <div class="detalles-valor">${equipo.tipoEquipo || ''}</div>
                </div>
                <div class="detalles-campo">
                    <div class="detalles-etiqueta">Marca:</div>
                    <div class="detalles-valor">${equipo.marca || ''}</div>
                </div>
                <div class="detalles-campo">
                    <div class="detalles-etiqueta">Modelo:</div>
                    <div class="detalles-valor">${equipo.modelo || ''}</div>
                </div>
                <div class="detalles-campo">
                    <div class="detalles-etiqueta">Número de Serie:</div>
                    <div class="detalles-valor">${equipo.serial || ''}</div>
                </div>
                ${equipo.contrasena ? `
                <div class="detalles-campo">
                    <div class="detalles-etiqueta">Contraseña:</div>
                    <div class="detalles-valor">${equipo.contrasena}</div>
                </div>
                ` : ''}
            </div>
        </div>
    `;
    
    // Componentes del equipo
    if (equipo.procesador || equipo.tarjetaGrafica || equipo.memoriaRam || equipo.almacenamiento) {
        html += `
            <div class="detalles-seccion">
                <div class="detalles-titulo">Componentes</div>
                <div class="detalles-contenido">
                    ${equipo.procesador ? `
                    <div class="detalles-campo">
                        <div class="detalles-etiqueta">Procesador:</div>
                        <div class="detalles-valor">${equipo.procesador}</div>
                    </div>
                    ` : ''}
                    ${equipo.tarjetaGrafica ? `
                    <div class="detalles-campo">
                        <div class="detalles-etiqueta">Tarjeta Gráfica:</div>
                        <div class="detalles-valor">${equipo.tarjetaGrafica}</div>
                    </div>
                    ` : ''}
                    ${equipo.memoriaRam ? `
                    <div class="detalles-campo">
                        <div class="detalles-etiqueta">Memoria RAM:</div>
                        <div class="detalles-valor">${equipo.memoriaRam}</div>
                    </div>
                    ` : ''}
                    ${equipo.almacenamiento ? `
                    <div class="detalles-campo">
                        <div class="detalles-etiqueta">Almacenamiento:</div>
                        <div class="detalles-valor">${equipo.almacenamiento}</div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    // Verificaciones
    html += `
        <div class="detalles-seccion">
            <div class="detalles-titulo">Verificaciones</div>
            <div class="detalles-contenido">
                <div class="detalles-checkboxes">
                    <div class="detalles-checkbox">
                        <div class="detalles-checkbox-icon ${equipo.verificacionPuertosUsb ? 'detalles-checkbox-true' : 'detalles-checkbox-false'}">
                            <i class="fas ${equipo.verificacionPuertosUsb ? 'fa-check' : 'fa-times'}"></i>
                        </div>
                        <div>Puertos USB</div>
                    </div>
                    <div class="detalles-checkbox">
                        <div class="detalles-checkbox-icon ${equipo.verificacionCamara ? 'detalles-checkbox-true' : 'detalles-checkbox-false'}">
                            <i class="fas ${equipo.verificacionCamara ? 'fa-check' : 'fa-times'}"></i>
                        </div>
                        <div>Cámara</div>
                    </div>
                    <div class="detalles-checkbox">
                        <div class="detalles-checkbox-icon ${equipo.verificacionMicrofono ? 'detalles-checkbox-true' : 'detalles-checkbox-false'}">
                            <i class="fas ${equipo.verificacionMicrofono ? 'fa-check' : 'fa-times'}"></i>
                        </div>
                        <div>Micrófono</div>
                    </div>
                    <div class="detalles-checkbox">
                        <div class="detalles-checkbox-icon ${equipo.verificacionSistemaOperativo ? 'detalles-checkbox-true' : 'detalles-checkbox-false'}">
                            <i class="fas ${equipo.verificacionSistemaOperativo ? 'fa-check' : 'fa-times'}"></i>
                        </div>
                        <div>Sistema Operativo</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Accesorios
    html += `
        <div class="detalles-seccion">
            <div class="detalles-titulo">Accesorios Entregados</div>
            <div class="detalles-contenido">
                <div class="detalles-checkboxes">
                    <div class="detalles-checkbox">
                        <div class="detalles-checkbox-icon ${equipo.entregaCargador ? 'detalles-checkbox-true' : 'detalles-checkbox-false'}">
                            <i class="fas ${equipo.entregaCargador ? 'fa-check' : 'fa-times'}"></i>
                        </div>
                        <div>Cargador</div>
                    </div>
                    <div class="detalles-checkbox">
                        <div class="detalles-checkbox-icon ${equipo.entregaForro ? 'detalles-checkbox-true' : 'detalles-checkbox-false'}">
                            <i class="fas ${equipo.entregaForro ? 'fa-check' : 'fa-times'}"></i>
                        </div>
                        <div>Forro/Estuche</div>
                    </div>
                </div>
                ${equipo.otrosAccesorios ? `
                <div class="detalles-campo" style="margin-top: 10px;">
                    <div class="detalles-etiqueta">Otros accesorios:</div>
                    <div class="detalles-valor">${equipo.otrosAccesorios}</div>
                </div>
                ` : ''}
            </div>
        </div>
    `;
    
    // Problema y Observaciones
    html += `
        <div class="detalles-seccion">
            <div class="detalles-titulo">Problema y Observaciones</div>
            <div class="detalles-contenido">
                <div class="detalles-campo">
                    <div class="detalles-etiqueta">Problema reportado:</div>
                    <div class="detalles-valor">${equipo.problema || ''}</div>
                </div>
                ${equipo.observaciones ? `
                <div class="detalles-campo">
                    <div class="detalles-etiqueta">Observaciones:</div>
                    <div class="detalles-valor">${equipo.observaciones}</div>
                </div>
                ` : ''}
            </div>
        </div>
    `;
    
    // Servicios solicitados
    const servicios = [];
    if (equipo.requiereFormateo) servicios.push('Formateo');
    if (equipo.requiereClonacion) servicios.push('Clonación de disco');
    if (equipo.requiereCopiaSeguridad) servicios.push('Copia de seguridad');
    if (equipo.requiereTermalpads) servicios.push('Cambio de termalpads');
    
    if (servicios.length > 0 || equipo.serviciosAdicionales) {
        html += `
            <div class="detalles-seccion">
                <div class="detalles-titulo">Servicios Solicitados</div>
                <div class="detalles-contenido">
                    ${servicios.length > 0 ? `
                    <div class="detalles-campo">
                        <div class="detalles-etiqueta">Servicios:</div>
                        <div class="detalles-valor">${servicios.join(', ')}</div>
                    </div>
                    ` : ''}
                    ${equipo.serviciosAdicionales ? `
                    <div class="detalles-campo">
                        <div class="detalles-etiqueta">Servicios adicionales:</div>
                        <div class="detalles-valor">${equipo.serviciosAdicionales}</div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    // Información de abono
    if (equipo.realizoAbono) {
        html += `
            <div class="detalles-seccion">
                <div class="detalles-titulo">Información de Abono</div>
                <div class="detalles-contenido">
                    <div class="detalles-campo">
                        <div class="detalles-etiqueta">Método de pago:</div>
                        <div class="detalles-valor">${equipo.metodoPagoAbono || 'No especificado'}</div>
                    </div>
                    <div class="detalles-campo">
                        <div class="detalles-etiqueta">Fecha del abono:</div>
                        <div class="detalles-valor">${formatearFecha(equipo.fechaAbono) || 'No registrada'}</div>
                    </div>
                    <div class="detalles-campo">
                        <div class="detalles-etiqueta">Valor del abono:</div>
                        <div class="detalles-valor">${formatearNumero(equipo.valorAbono || 0)}</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Fotografías
    html += `
        <div class="detalles-seccion">
            <div class="detalles-titulo">Fotografías</div>
            <div class="detalles-contenido">
                <div class="detalles-imagenes">
                    <div class="detalles-imagen-container">
                        <div class="detalles-imagen-titulo">Fotografía de Entrada</div>
                        ${equipo.fotoEntrada 
                            ? `<img src="${equipo.fotoEntrada}" alt="Fotografía de entrada" class="detalles-imagen">` 
                            : `<div class="detalles-no-imagen">No hay fotografía de entrada</div>`
                        }
                    </div>
                    <div class="detalles-imagen-container">
                        <div class="detalles-imagen-titulo">Fotografía de Salida</div>
                        ${equipo.fotoSalida
                            ? `<img src="${equipo.fotoSalida}" alt="Fotografía de salida" class="detalles-imagen">` 
                            : `<div class="detalles-no-imagen">No hay fotografía de salida</div>`
                        }
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return html;
}

// Imprimir detalles
function imprimirDetalles() {
    try {
        const detallesContent = document.getElementById('detalles-equipo')?.innerHTML;
        if (!detallesContent) {
            console.error("Contenido de detalles no encontrado");
            return;
        }
        
        const originalContent = document.body.innerHTML;
        
        document.body.innerHTML = `
            <div style="padding: 20px;">
                <h1 style="text-align: center; margin-bottom: 20px;">Detalles del Equipo</h1>
                ${detallesContent}
            </div>
        `;
        
        window.print();
        document.body.innerHTML = originalContent;
        
        // Reinicializar eventos después de restaurar el contenido
        document.addEventListener('DOMContentLoaded', () => {
            setupTabNavigation();
            setupModalEvents();
            setupSearchEvents();
            setupFormEvents();
            actualizarVistas();
        });
    } catch (error) {
        console.error("Error imprimiendo detalles:", error);
    }
}

// Abrir modal de impresión
function abrirModalImpresion(id) {
    try {
        const equipo = equipos.find(e => e.id === id);
        if (!equipo) {
            console.error("Equipo no encontrado:", id);
            return;
        }
        
        const printData = document.getElementById('print-data');
        if (!printData) {
            console.error("Elemento 'print-data' no encontrado");
            return;
        }
        
        const date = new Date().toLocaleDateString('es-CO');
        const time = new Date().toLocaleTimeString('es-CO');
        
        let html = `
            <div class="print-field">
                <span class="print-label">Fecha de recepción:</span>
                <span class="print-value">${formatearFecha(equipo.fecha)}</span>
            </div>
            <div class="print-field">
                <span class="print-label">Hora de recepción:</span>
                <span class="print-value">${equipo.hora || 'No registrada'}</span>
            </div>
            <div class="print-field">
                <span class="print-label">N° de orden:</span>
                <span class="print-value">${equipo.id}</span>
            </div>
            <div class="print-field">
                <span class="print-label">Cliente:</span>
                <span class="print-value">${equipo.nombreCliente || ''}</span>
            </div>
            <div class="print-field">
                <span class="print-label">Identificación:</span>
                <span class="print-value">${equipo.tipoIdentificacion || 'CC'} ${equipo.numeroIdentificacion || 'No registrada'}</span>
            </div>
            <div class="print-field">
                <span class="print-label">Teléfono:</span>
                <span class="print-value">${equipo.celular || ''}</span>
            </div>
            <div class="print-field">
                <span class="print-label">Equipo:</span>
                <span class="print-value">${equipo.tipoEquipo || ''} ${equipo.marca || ''} ${equipo.modelo || ''}</span>
            </div>
            <div class="print-field">
                <span class="print-label">Serial:</span>
                <span class="print-value">${equipo.serial || ''}</span>
            </div>
        `;
        
        // Información de componentes si está disponible
        if (equipo.procesador || equipo.memoriaRam || equipo.almacenamiento) {
            html += `<div class="print-section-title">Componentes</div>`;
            
            if (equipo.procesador) {
                html += `
                    <div class="print-field">
                        <span class="print-label">Procesador:</span>
                        <span class="print-value">${equipo.procesador}</span>
                    </div>
                `;
            }
            
            if (equipo.tarjetaGrafica) {
                html += `
                    <div class="print-field">
                        <span class="print-label">Gráfica:</span>
                        <span class="print-value">${equipo.tarjetaGrafica}</span>
                    </div>
                `;
            }
            
            if (equipo.memoriaRam) {
                html += `
                    <div class="print-field">
                        <span class="print-label">RAM:</span>
                        <span class="print-value">${equipo.memoriaRam}</span>
                    </div>
                `;
            }
            
            if (equipo.almacenamiento) {
                html += `
                    <div class="print-field">
                        <span class="print-label">Almacenamiento:</span>
                        <span class="print-value">${equipo.almacenamiento}</span>
                    </div>
                `;
            }
        }
        
        // Accesorios entregados
        html += `<div class="print-section-title">Accesorios entregados</div>`;
        html += `
            <div class="print-field">
                <span class="print-label">Cargador:</span>
                <span class="print-value">${equipo.entregaCargador ? 'Sí' : 'No'}</span>
            </div>
            <div class="print-field">
                <span class="print-label">Forro/Estuche:</span>
                <span class="print-value">${equipo.entregaForro ? 'Sí' : 'No'}</span>
            </div>
        `;
        
        if (equipo.otrosAccesorios) {
            html += `
                <div class="print-field">
                    <span class="print-label">Otros accesorios:</span>
                    <span class="print-value">${equipo.otrosAccesorios}</span>
                </div>
            `;
        }
        
        // Problema reportado y observaciones
        html += `<div class="print-section-title">Detalles del servicio</div>`;
        html += `
            <div class="print-field">
                <span class="print-label">Problema reportado:</span>
                <span class="print-value">${equipo.problema || ''}</span>
            </div>
        `;
        
        if (equipo.observaciones) {
            html += `
                <div class="print-field">
                    <span class="print-label">Observaciones:</span>
                    <span class="print-value">${equipo.observaciones}</span>
                </div>
            `;
        }
        
        // Servicios solicitados
        const servicios = [];
        if (equipo.requiereFormateo) servicios.push('Formateo');
        if (equipo.requiereClonacion) servicios.push('Clonación de disco');
        if (equipo.requiereCopiaSeguridad) servicios.push('Copia de seguridad');
        if (equipo.requiereTermalpads) servicios.push('Cambio de termalpads');
        
        if (servicios.length > 0 || equipo.serviciosAdicionales) {
            html += `<div class="print-section-title">Servicios solicitados</div>`;
            
            if (servicios.length > 0) {
                html += `
                    <div class="print-field">
                        <span class="print-label">Servicios:</span>
                        <span class="print-value">${servicios.join(', ')}</span>
                    </div>
                `;
            }
            
            if (equipo.serviciosAdicionales) {
                html += `
                    <div class="print-field">
                        <span class="print-label">Adicionales:</span>
                        <span class="print-value">${equipo.serviciosAdicionales}</span>
                    </div>
                `;
            }
        }
        
        // Información de abono
        if (equipo.realizoAbono) {
            html += `<div class="print-section-title">Abono realizado</div>`;
            html += `
                <div class="print-field">
                    <span class="print-label">Método de pago:</span>
                    <span class="print-value">${equipo.metodoPagoAbono || 'No especificado'}</span>
                </div>
                <div class="print-field">
                    <span class="print-label">Fecha del abono:</span>
                    <span class="print-value">${formatearFecha(equipo.fechaAbono) || 'No registrada'}</span>
                </div>
                <div class="print-field">
                    <span class="print-label">Valor del abono:</span>
                    <span class="print-value">${formatearNumero(equipo.valorAbono || 0)}</span>
                </div>
            `;
        }
        
        // Técnico asignado
        if (equipo.tecnico) {
            html += `
                <div class="print-field">
                    <span class="print-label">Técnico asignado:</span>
                    <span class="print-value">${equipo.tecnico}</span>
                </div>
            `;
        }
        
        // Datos de impresión
        html += `
            <div class="print-field" style="margin-top: 20px;">
                <span class="print-label">Fecha y hora de impresión:</span>
                <span class="print-value">${date} ${time}</span>
            </div>
        `;
        
        // Fotografía de entrada si hay disponible
        if (equipo.fotoEntrada) {
            html += `
                <div class="print-section-title">Fotografía del equipo</div>
                <div class="print-image">
                    <img src="${equipo.fotoEntrada}" alt="Fotografía del equipo" style="max-width: 100%; max-height: 200px;">
                </div>
            `;
        }
        
        printData.innerHTML = html;
        
        const modalPrint = document.getElementById('modal-print');
        if (modalPrint) {
            modalPrint.style.display = 'flex';
        }
    } catch (error) {
        console.error("Error abriendo modal de impresión:", error);
    }
}

// Imprimir comprobante
function imprimirComprobante() {
    try {
        const printContent = document.getElementById('print-content')?.innerHTML;
        if (!printContent) {
            console.error("Contenido de impresión no encontrado");
            return;
        }
        
        const originalContent = document.body.innerHTML;
        
        document.body.innerHTML = `
            <div style="padding: 20px;">
                ${printContent}
            </div>
        `;
        
        window.print();
        document.body.innerHTML = originalContent;
        
        // Reinicializar eventos después de restaurar el contenido
        document.addEventListener('DOMContentLoaded', () => {
            setupTabNavigation();
            setupModalEvents();
            setupSearchEvents();
            setupFormEvents();
            actualizarVistas();
        });
    } catch (error) {
        console.error("Error imprimiendo comprobante:", error);
    }
}

// Confirmar reseteo del sistema
function confirmarResetearSistema() {
    try {
        const modalConfirm = document.getElementById('modal-confirm');
        const confirmMessage = document.getElementById('confirm-message');
        const btnConfirmAction = document.getElementById('btn-confirm-action');
        
        if (!modalConfirm || !confirmMessage || !btnConfirmAction) {
            console.error("Elementos del modal de confirmación no encontrados");
            return;
        }
        
        confirmMessage.textContent = '¿Estás seguro de que deseas RESETEAR el sistema? Todos los datos de equipos y clientes serán eliminados. Esta acción no se puede deshacer.';
        
        btnConfirmAction.onclick = () => {
            resetearSistema();
            modalConfirm.style.display = 'none';
        };
        
        modalConfirm.style.display = 'flex';
    } catch (error) {
        console.error("Error en confirmarResetearSistema:", error);
    }
}

// Resetear sistema
function resetearSistema() {
    try {
        equipos = [];
        clientes = [];
        equipoId = 1;
        
        actualizarVistas();
        mostrarMensaje('Sistema reseteado correctamente');
    } catch (error) {
        console.error("Error al resetear sistema:", error);
    }
}

// Mostrar mensaje temporal
function mostrarMensaje(mensaje, tipo = 'success') {
    try {
        // Crear elemento de mensaje
        const msgElement = document.createElement('div');
        msgElement.className = `mensaje mensaje-${tipo}`;
        msgElement.textContent = mensaje;
        
        // Añadir a la página
        document.body.appendChild(msgElement);
        
        // Mostrar con animación
        setTimeout(() => {
            msgElement.classList.add('mensaje-visible');
        }, 10);
        
        // Ocultar después de un tiempo
        setTimeout(() => {
            msgElement.classList.remove('mensaje-visible');
            setTimeout(() => {
                document.body.removeChild(msgElement);
            }, 300);
        }, 3000);
    } catch (error) {
        console.error("Error mostrando mensaje:", error);
    }
}

// Funciones auxiliares

// Formatear fecha en formato local
function formatearFecha(fechaStr) {
    if (!fechaStr) return '';
    
    try {
        const fecha = new Date(fechaStr);
        return fecha.toLocaleDateString('es-CO');
    } catch (error) {
        console.error("Error formateando fecha:", error);
        return fechaStr;
    }
}

// Formatear número como moneda
function formatearNumero(numero) {
    try {
        return new Intl.NumberFormat('es-CO').format(numero);
    } catch (error) {
        console.error("Error formateando número:", error);
        return numero;
    }
}

// Obtener clase CSS según estado
function clasePorEstado(estado) {
    if (!estado) return '';
    
    try {
        switch (estado) {
            case 'Recibido':
                return 'recibido';
            case 'En revisión':
                return 'revision';
            case 'En reparación':
                return 'reparacion';
            case 'Listo para entrega':
                return 'listo';
            case 'Entregado':
                return 'entregado';
            default:
                return '';
        }
    } catch (error) {
        console.error("Error obteniendo clase por estado:", error);
        return '';
    }
}

// Agregar estilos para mensajes
function agregarEstilosMensajes() {
    try {
        // Verificar si los estilos ya están agregados
        if (document.getElementById('estilos-mensajes')) {
            return;
        }
        
        const estilosMensajes = document.createElement('style');
        estilosMensajes.id = 'estilos-mensajes';
        estilosMensajes.textContent = `
            .mensaje {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 10px 20px;
                border-radius: 4px;
                color: white;
                font-weight: 500;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                z-index: 9999;
                transform: translateY(-20px);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .mensaje-visible {
                transform: translateY(0);
                opacity: 1;
            }
            
            .mensaje-success {
                background-color: #10b981;
            }
            
            .mensaje-warning {
                background-color: #f59e0b;
            }
            
            .mensaje-error {
                background-color: #ef4444;
            }
        `;
        document.head.appendChild(estilosMensajes);
    } catch (error) {
        console.error("Error agregando estilos de mensajes:", error);
    }
}

// Inicializar estilos de mensajes cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    agregarEstilosMensajes();
});
        // Actualizar tabla de clientes
function actualizarTablaClientes() {
    const tablaBody = document.getElementById('clientes-table-body');
    if (!tablaBody) {
        console.error("Elemento 'clientes-table-body' no encontrado");
        return;
    }
    
    let html = '';
    
    if (clientes.length === 0) {
        html = `<tr><td colspan="5" class="text-center">No hay clientes registrados</td></tr>`;
    } else {
        // Filtrar clientes según la búsqueda
        const clientesFiltrados = filtroTexto ? 
            clientes.filter(cliente => 
                (cliente.nombre && cliente.nombre.toLowerCase().includes(filtroTexto)) || 
                (cliente.celular && cliente.celular.includes(filtroTexto)) ||
                (cliente.email && cliente.email.toLowerCase().includes(filtroTexto))
            ) : clientes;
        
        clientesFiltrados.forEach(cliente => {
            const cantidadEquipos = equipos.filter(e => e.celular === cliente.celular).length;
            
            html += `
                <tr>
                    <td>${cliente.nombre || ''}</td>
                    <td>${cliente.celular || ''}</td>
                    <td>${cliente.email || '-'}</td>
                    <td>${cliente.direccion || '-'}</td>
                    <td>${cantidadEquipos}</td>
                </tr>
            `;
        });
    }
    
    tablaBody.innerHTML = html;
}

// Actualizar estadísticas
function actualizarEstadisticas() {
    try {
        // Estadísticas por estado
        const estadosStats = document.getElementById('estados-stats');
        if (!estadosStats) {
            console.error("Elemento 'estados-stats' no encontrado");
            return;
        }
        
        const estadosPosibles = ['Recibido', 'En revisión', 'En reparación', 'Listo para entrega', 'Entregado'];
        
        let htmlEstados = '';
        estadosPosibles.forEach(estado => {
            const cantidad = equipos.filter(e => e.estado === estado).length;
            htmlEstados += `
                <li>
                    <span>${estado}</span>
                    <span class="stats-value">${cantidad}</span>
                </li>
            `;
        });
        
        estadosStats.innerHTML = htmlEstados;
        
        // Estadísticas por tipo de equipo
        const tiposStats = document.getElementById('tipos-stats');
        if (tiposStats) {
            const tiposPosibles = ['Portátil', 'Torre', 'Consola', 'Tablet', 'Otro'];
            
            let htmlTipos = '';
            tiposPosibles.forEach(tipo => {
                const cantidad = equipos.filter(e => e.tipoEquipo === tipo).length;
                htmlTipos += `
                    <li>
                        <span>${tipo}</span>
                        <span class="stats-value">${cantidad}</span>
                    </li>
                `;
            });
            
            tiposStats.innerHTML = htmlTipos;
        }
    } catch (error) {
        console.error("Error en actualizarEstadisticas:", error);
    }
}

// Actualizar gráficos
function actualizarGraficos() {
    try {
        const ctx = document.getElementById('chart-container');
        if (!ctx) {
            console.error("Elemento 'chart-container' no encontrado");
            return;
        }
        
        // Verificar si Chart está disponible
        if (typeof Chart === 'undefined') {
            console.error("Librería Chart.js no disponible");
            return;
        }
        
        // Destruir gráfico si ya existe
        if (window.tiposChart) {
            window.tiposChart.destroy();
        }
        
        // Datos para el gráfico
        const tiposPosibles = ['Portátil', 'Torre', 'Consola', 'Tablet', 'Otro'];
        const datos = tiposPosibles.map(tipo => equipos.filter(e => e.tipoEquipo === tipo).length);
        
        // Colores para el gráfico
        const colores = [
            'rgba(37, 99, 235, 0.7)',
            'rgba(59, 130, 246, 0.7)',
            'rgba(96, 165, 250, 0.7)',
            'rgba(147, 197, 253, 0.7)',
            'rgba(191, 219, 254, 0.7)'
        ];
        
        // Crear gráfico
        window.tiposChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: tiposPosibles,
                datasets: [{
                    data: datos,
                    backgroundColor: colores,
                    borderColor: '#ffffff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Distribución por Tipo de Equipo',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error en actualizarGraficos:", error);
    }
}

// Abrir modal para nuevo equipo
function abrirModalNuevoEquipo() {
    try {
        // Reiniciar formulario
        const equipoForm = document.getElementById('equipo-form');
        const equipoIdInput = document.getElementById('equipo-id');
        const fechaInput = document.getElementById('fecha');
        const horaInput = document.getElementById('hora');
        const detallesAbono = document.getElementById('detalles-abono');
        const previewFotoEntrada = document.getElementById('preview-fotoEntrada');
        const previewFotoSalida = document.getElementById('preview-fotoSalida');
        const modalTitle = document.getElementById('modal-title');
        const modal = document.getElementById('modal-equipo');
        
        if (equipoForm) equipoForm.reset();
        if (equipoIdInput) equipoIdInput.value = '';
        
        // Establecer fecha y hora actuales
        if (fechaInput) fechaInput.value = new Date().toISOString().split('T')[0];
        
        if (horaInput) {
            const ahora = new Date();
            const horaActual = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}`;
            horaInput.value = horaActual;
        }
        
        // Mostrar la primera pestaña
        mostrarTab('cliente');
        
        // Ocultar secciones condicionales
        if (detallesAbono) detallesAbono.style.display = 'none';
        
        // Limpiar previsualizaciones de imágenes
        if (previewFotoEntrada) {
            previewFotoEntrada.innerHTML = '';
            previewFotoEntrada.classList.remove('has-image');
        }
        
        if (previewFotoSalida) {
            previewFotoSalida.innerHTML = '';
            previewFotoSalida.classList.remove('has-image');
        }
        
        // Actualizar título del modal
        if (modalTitle) modalTitle.textContent = 'Registrar Nuevo Equipo';
        
        // Mostrar modal y hacer scroll al inicio
        if (modal) {
            modal.style.display = 'flex';
            
            // Asegurarse de que el scroll esté al inicio
            setTimeout(() => {
                const modalBody = modal.querySelector('.modal-body');
                if (modalBody) {
                    modalBody.scrollTop = 0;
                }
            }, 100);
        }
    } catch (error) {
        console.error("Error en abrirModalNuevoEquipo:", error);
    }
}

// Editar equipo existente
function editarEquipo(id) {
    try {
        const equipo = equipos.find(e => e.id === id);
        if (!equipo) {
            console.error("Equipo no encontrado:", id);
            return;
        }
        
        // Llenar formulario con datos básicos
        setFormValue('equipo-id', equipo.id);
        setFormValue('fecha', equipo.fecha);
        setFormValue('hora', equipo.hora);
        setFormValue('nombreCliente', equipo.nombreCliente);
        setFormValue('tipoIdentificacion', equipo.tipoIdentificacion || 'CC');
        setFormValue('numeroIdentificacion', equipo.numeroIdentificacion);
        setFormValue('celular', equipo.celular);
        setFormValue('email', equipo.email);
        setFormValue('direccion', equipo.direccion);
        setFormValue('tipoEquipo', equipo.tipoEquipo || 'Portátil');
        setFormValue('marca', equipo.marca);
        setFormValue('modelo', equipo.modelo);
        setFormValue('serial', equipo.serial);
        setFormValue('contrasena', equipo.contrasena);
        
        // Componentes
        setFormValue('procesador', equipo.procesador);
        setFormValue('tarjetaGrafica', equipo.tarjetaGrafica);
        setFormValue('memoriaRam', equipo.memoriaRam);
        setFormValue('almacenamiento', equipo.almacenamiento);
        
        // Verificaciones
        setFormCheckbox('verificacionPuertosUsb', equipo.verificacionPuertosUsb);
        setFormCheckbox('verificacionCamara', equipo.verificacionCamara);
        setFormCheckbox('verificacionMicrofono', equipo.verificacionMicrofono);
        setFormCheckbox('verificacionSistemaOperativo', equipo.verificacionSistemaOperativo);
        
        // Accesorios
        setFormCheckbox('entregaCargador', equipo.entregaCargador);
        setFormCheckbox('entregaForro', equipo.entregaForro);
        setFormValue('otrosAccesorios', equipo.otrosAccesorios);
        
        // Problema y observaciones
        setFormValue('problema', equipo.problema);
        setFormValue('observaciones', equipo.observaciones);
        
        // Servicios
        setFormCheckbox('requiereFormateo', equipo.requiereFormateo);
        setFormCheckbox('requiereClonacion', equipo.requiereClonacion);
        setFormCheckbox('requiereCopiaSeguridad', equipo.requiereCopiaSeguridad);
        setFormCheckbox('requiereTermalpads', equipo.requiereTermalpads);
        setFormValue('serviciosAdicionales', equipo.serviciosAdicionales);
        
        // Abonos
        setFormCheckbox('realizoAbono', equipo.realizoAbono);
        setFormValue('metodoPagoAbono', equipo.metodoPagoAbono);
        setFormValue('fechaAbono', equipo.fechaAbono);
        setFormValue('valorAbono', equipo.valorAbono);
        
        // Mostrar/ocultar detalles de abono
        const detallesAbono = document.getElementById('detalles-abono');
        if (detallesAbono) {
            detallesAbono.style.display = equipo.realizoAbono ? 'block' : 'none';
        }
        
        // Estado
        setFormValue('estado', equipo.estado || 'Recibido');
        setFormValue('tecnico', equipo.tecnico);
        
        // Fotos
        showImage('preview-fotoEntrada', equipo.fotoEntrada, 'Foto de entrada');
        showImage('preview-fotoSalida', equipo.fotoSalida, 'Foto de salida');
        
        // Mostrar la primera pestaña
        mostrarTab('cliente');
        
        // Actualizar título del modal
        const modalTitle = document.getElementById('modal-title');
        if (modalTitle) {
            modalTitle.textContent = 'Editar Equipo';
        }
        
        // Mostrar modal
        const modal = document.getElementById('modal-equipo');
        if (modal) {
            modal.style.display = 'flex';
        }
    } catch (error) {
        console.error("Error en editarEquipo:", error);
    }
}

// Función de ayuda para establecer valores del formulario
function setFormValue(id, value) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.value = value || '';
    }
}

// Función de ayuda para establecer checkboxes
function setFormCheckbox(id, checked) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.checked = Boolean(checked);
    }
}

// Función de ayuda para mostrar imágenes
function showImage(previewId, imageData, altText) {
    const previewElement = document.getElementById(previewId);
    if (!previewElement) return;
    
    if (imageData) {
        previewElement.innerHTML = `<img src="${imageData}" alt="${altText || 'Imagen'}" class="detalles-imagen">`;
        previewElement.classList.add('has-image');
    } else {
        previewElement.innerHTML = '';
        previewElement.classList.remove('has-image');
    }
}

// Guardar equipo (nuevo o editado)
function guardarEquipo() {
    try {
        const form = document.getElementById('equipo-form');
        if (!form) {
            console.error("Formulario no encontrado");
            return;
        }
        
        // Obtener datos básicos del formulario
        const formData = new FormData(form);
        
        // Crear objeto base para el equipo
        const equipoData = {
            // ID
            id: formData.get('id') ? parseInt(formData.get('id')) : null,
            
            // Datos básicos
            fecha: formData.get('fecha') || '',
            hora: formData.get('hora') || '',
            
            // Datos del cliente
            nombreCliente: formData.get('nombreCliente') || '',
            tipoIdentificacion: formData.get('tipoIdentificacion') || 'CC',
            numeroIdentificacion: formData.get('numeroIdentificacion') || '',
            celular: formData.get('celular') || '',
            email: formData.get('email') || '',
            direccion: formData.get('direccion') || '',
            
            // Datos del equipo
            tipoEquipo: formData.get('tipoEquipo') || 'Portátil',
            marca: formData.get('marca') || '',
            modelo: formData.get('modelo') || '',
            serial: formData.get('serial') || '',
            contrasena: formData.get('contrasena') || '',
            
            // Componentes
            procesador: formData.get('procesador') || '',
            tarjetaGrafica: formData.get('tarjetaGrafica') || '',
            memoriaRam: formData.get('memoriaRam') || '',
            almacenamiento: formData.get('almacenamiento') || '',
            
            // Verificaciones
            verificacionPuertosUsb: formData.get('verificacionPuertosUsb') === 'on',
            verificacionCamara: formData.get('verificacionCamara') === 'on',
            verificacionMicrofono: formData.get('verificacionMicrofono') === 'on',
            verificacionSistemaOperativo: formData.get('verificacionSistemaOperativo') === 'on',
            
            // Accesorios
            entregaCargador: formData.get('entregaCargador') === 'on',
            entregaForro: formData.get('entregaForro') === 'on',
            otrosAccesorios: formData.get('otrosAccesorios') || '',
            
            // Problema y observaciones
            problema: formData.get('problema') || '',
            observaciones: formData.get('observaciones') || '',
            
            // Mantenimiento
            requiereFormateo: formData.get('requiereFormateo') === 'on',
            requiereClonacion: formData.get('requiereClonacion') === 'on',
            requiereCopiaSeguridad: formData.get('requiereCopiaSeguridad') === 'on',
            requiereTermalpads: formData.get('requiereTermalpads') === 'on',
            serviciosAdicionales: formData.get('serviciosAdicionales') || '',
            
            // Abono
            realizoAbono: formData.get('realizoAbono') === 'on',
            metodoPagoAbono: formData.get('metodoPagoAbono') || '',
            fechaAbono: formData.get('fechaAbono') || '',
            valorAbono: formData.get('valorAbono') ? parseInt(formData.get('valorAbono')) : 0,
            
            // Estado y técnico
            estado: formData.get('estado') || 'Recibido',
            tecnico: formData.get('tecnico') || '',
            fechaEntrega: ''
        };
        
        // Obtener las fotografías
        procesarImagenes(equipoData, () => {
            guardarEquipoEnSistema(equipoData);
        });
    } catch (error) {
        console.error("Error en guardarEquipo:", error);
        mostrarMensaje('Error al guardar el equipo', 'error');
    }
}

// Procesar imágenes del formulario
function procesarImagenes(equipoData, callback) {
    try {
        const fotoEntradaInput = document.getElementById('fotoEntrada');
        const fotoSalidaInput = document.getElementById('fotoSalida');
        
        // Procesar imágenes si se han seleccionado
        if (fotoEntradaInput && fotoEntradaInput.files && fotoEntradaInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                equipoData.fotoEntrada = e.target.result;
                procesarImagenSalida();
            };
            reader.readAsDataURL(fotoEntradaInput.files[0]);
        } else {
            procesarImagenSalida();
        }
        
        function procesarImagenSalida() {
            if (fotoSalidaInput && fotoSalidaInput.files && fotoSalidaInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    equipoData.fotoSalida = e.target.result;
                    callback();
                };
                reader.readAsDataURL(fotoSalidaInput.files[0]);
            } else {
                callback();
            }
        }
    } catch (error) {
        console.error("Error procesando imágenes:", error);
        callback();
    }
}

// Guardar el equipo en el sistema
function guardarEquipoEnSistema(equipoData) {
    try {
        if (equipoData.id) {
            // Actualizar equipo existente
            const index = equipos.findIndex(e => e.id === equipoData.id);
            if (index !== -1) {
                // Mantener la foto de entrada si no se ha cambiado
                if (!equipoData.fotoEntrada && equipos[index].fotoEntrada) {
                    equipoData.fotoEntrada = equipos[index].fotoEntrada;
                }
                
                // Mantener la foto de salida si no se ha cambiado
                if (!equipoData.fotoSalida && equipos[index].fotoSalida) {
                    equipoData.fotoSalida = equipos[index].fotoSalida;
                }
                
                equipos[index] = equipoData;
            }
        } else {
            // Crear nuevo equipo
            equipoData.id = equipoId++;
            equipos.push(equipoData);
            
            // Verificar si el cliente ya existe, si no, agregarlo
            const clienteExiste = clientes.some(cliente => cliente.celular === equipoData.celular);
            if (!clienteExiste && equipoData.celular) {
                clientes.push({
                    nombre: equipoData.nombreCliente,
                    celular: equipoData.celular,
                    email: equipoData.email,
                    direccion: equipoData.direccion,
                    tipoIdentificacion: equipoData.tipoIdentificacion,
                    numeroIdentificacion: equipoData.numeroIdentificacion
                });
            }
        }
        
        // Cerrar modal y actualizar vistas
        const modalEquipo = document.getElementById('modal-equipo');
        if (modalEquipo) {
            modalEquipo.style.display = 'none';
        }
        
        actualizarVistas();
        
        // Mostrar mensaje de éxito
        mostrarMensaje(equipoData.id ? 'Equipo actualizado correctamente' : 'Nuevo equipo registrado correctamente');
    } catch (error) {
        console.error("Error guardando equipo en sistema:", error);
        mostrarMensaje('Error al guardar el equipo', 'error');
    }
}

// Confirmar eliminación de equipo
function confirmarEliminarEquipo(id) {
    try {
        const equipo = equipos.find(e => e.id === id);
        if (!equipo) {
            console.error("Equipo no encontrado:", id);
            return;
        }
        
        const modalConfirm = document.getElementById('modal-confirm');
        const confirmMessage = document.getElementById('confirm-message');
        const btnConfirmAction = document.getElementById('btn-confirm-action');
        
        if (!modalConfirm || !confirmMessage || !btnConfirmAction) {
            console.error("Elementos del modal de confirmación no encontrados");
            return;
        }
        
        confirmMessage.textContent = `¿Estás seguro de que deseas eliminar el equipo ${equipo.marca} ${equipo.modelo} de ${equipo.nombreCliente}?`;
        
        btnConfirmAction.onclick = () => {
            eliminarEquipo(id);
            modalConfirm.style.display = 'none';
        };
        
        modalConfirm.style.display = 'flex';
    } catch (error) {
        console.error("Error en confirmarEliminarEquipo:", error);
    }
}

// Eliminar equipo
function eliminarEquipo(id) {
    try {
        equipos = equipos.filter(equipo => equipo.id !== id);
        actualizarVistas();
        mostrarMensaje('Equipo eliminado correctamente');
    } catch (error) {
        console.error("Error eliminando equipo:", error);
        mostrarMensaje('Error al eliminar el equipo', 'error');
    }
}

// Buscar cliente por celular
function buscarCliente() {
    try {
        const celular = document.getElementById('celular')?.value;
        if (!celular) return;
        
        const cliente = clientes.find(c => c.celular === celular);
        if (cliente) {
            setFormValue('nombreCliente', cliente.nombre);
            setFormValue('tipoIdentificacion', cliente.tipoIdentificacion || 'CC');
            setFormValue('numeroIdentificacion', cliente.numeroIdentificacion);
            setFormValue('email', cliente.email);
            setFormValue('direccion', cliente.direccion);
            mostrarMensaje('Cliente encontrado');
        } else {
            mostrarMensaje('Cliente no encontrado. Complete los datos.', 'warning');
        }
    } catch (error) {
        console.error("Error buscando cliente:", error);
    }
}

// Avanzar estado de un equipo (en la vista de kanban)
function avanzarEstado(id) {
    try {
        const equipo = equipos.find(e => e.id === id);
        if (!equipo) {
            console.error("Equipo no encontrado:", id);
            return;
        }
        
        const estadoActual = equipo.estado;
        let nuevoEstado = estadoActual;
        
        switch (estadoActual) {
            case 'Recibido':
                nuevoEstado = 'En revisión';
                break;
            case 'En revisión':
                nuevoEstado = 'En reparación';
                break;
            case 'En reparación':
                nuevoEstado = 'Listo para entrega';
                break;
        }
        
        if (nuevoEstado !== estadoActual) {
            equipo.estado = nuevoEstado;
            actualizarVistas();
            mostrarMensaje(`Equipo avanzado a estado: ${nuevoEstado}`);
        }
    } catch (error) {
        console.error("Error avanzando estado:", error);
    }
}

// Registrar entrega de equipo
function registrarEntrega(id) {
    try {
        const equipo = equipos.find(e => e.id === id);
        if (!equipo) {
            console.error("Equipo no encontrado:", id);
            return;
        }
        
        equipo.estado = 'Entregado';
        equipo.fechaEntrega = new Date().toISOString().split('T')[0];
        
        actualizarVistas();
        mostrarMensaje('Entrega registrada correctamente');
    } catch (error) {
        console.error("Error registrando entrega:", error);
    }
}

// Ver detalles completos del equipo
function verDetallesEquipo(id) {
    try {
        const equipo = equipos.find(e => e.id === id);
        if (!equipo) {
            console.error("Equipo no encontrado:", id);
            return;
        }
        
        const contenedor = document.getElementById('detalles-equipo');
        if (!contenedor) {
            console.error("Contenedor de detalles no encontrado");
            return;
        }
        
        let html = generarHtmlDetalles(equipo);
        contenedor.innerHTML = html;
        
        // Obtener y configurar botones de cierre
        const btnDetallesClose = document.querySelectorAll('.detalles-close');
        btnDetallesClose.forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('modal-detalles').style.display = 'none';
            });
        });
        
        // Configurar botón de impresión
        const btnPrintDetalles = document.getElementById('btn-print-detalles');
        if (btnPrintDetalles) {
            btnPrintDetalles.onclick = () => {
                imprimirDetalles();
            };
        }
        
        // Mostrar modal
        const modalDetalles = document.getElementById('modal-detalles');
        if (modalDetalles) {
            modalDetalles.style.display = 'flex';
        }
    } catch (error) {
        console.error("Error mostrando detalles del equipo:", error);
        mostrarMensaje('Error al mostrar detalles', 'error');
    }
}     
/**
 * TechService - Sistema de Gestión de Servicio Técnico
 * Archivo JavaScript principal - VERSIÓN CORREGIDA
 */
// Datos del sistema (simulado - en un sistema real se usaría una base de datos)
let equipos = [];
let clientes = [];
let equipoId = 1;
let filtroTexto = '';
let currentTabId = 'recepcion';
let currentFormTab = 'cliente';

// Cargar datos iniciales (vacíos, sin ejemplos)
function cargarDatosEjemplo() {
    // Inicializa arrays vacíos
    equipos = [];
    clientes = [];
    // Reinicia el contador de ID
    equipoId = 1;
}

// Estructura ampliada de un equipo
const equipoTemplate = {
    // Datos básicos
    id: null,
    fecha: '',
    hora: '',
    
    // Datos del cliente
    nombreCliente: '',
    tipoIdentificacion: 'CC',
    numeroIdentificacion: '',
    celular: '',
    email: '',
    direccion: '',
    
    // Datos del equipo
    tipoEquipo: 'Portátil',
    marca: '',
    modelo: '',
    serial: '',
    contrasena: '',
    
    // Componentes
    procesador: '',
    tarjetaGrafica: '',
    memoriaRam: '',
    almacenamiento: '',
    
    // Verificaciones
    verificacionPuertosUsb: false,
    verificacionCamara: false,
    verificacionMicrofono: false,
    verificacionSistemaOperativo: false,
    
    // Accesorios
    entregaCargador: false,
    entregaForro: false,
    otrosAccesorios: '',
    
    // Problema y observaciones
    problema: '',
    observaciones: '',
    
    // Mantenimiento
    requiereFormateo: false,
    requiereClonacion: false,
    requiereCopiaSeguridad: false,
    requiereTermalpads: false,
    serviciosAdicionales: '',
    
    // Abono
    realizoAbono: false,
    metodoPagoAbono: '',
    fechaAbono: '',
    valorAbono: 0,
    
    // Estado y técnico
    estado: 'Recibido',
    tecnico: '',
    fechaEntrega: '',
    
    // Fotografías (URLs o Base64)
    fotoEntrada: '',
    fotoSalida: ''
};

// Inicializar la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos de ejemplo
    cargarDatosEjemplo();
    
    // Configurar navegación entre pestañas
    setupTabNavigation();
    
    // Configurar eventos para modales
    setupModalEvents();
    
    // Configurar eventos de búsqueda
    setupSearchEvents();
    
    // Configurar eventos del formulario
    setupFormEvents();
    
    // Mostrar datos iniciales
    actualizarVistas();
});

// Configurar navegación entre pestañas
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.nav-btn');
    
    if (!tabButtons || tabButtons.length === 0) {
        console.error("No se encontraron elementos '.nav-btn'");
        return;
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            if (tabId) {
                cambiarTab(tabId);
            }
        });
    });
}

// Cambiar entre pestañas
function cambiarTab(tabId) {
    // Verificar si los elementos existen antes de manipularlos
    const btnElement = document.getElementById(`btn-${tabId}`);
    const tabElement = document.getElementById(`tab-${tabId}`);
    
    if (!btnElement || !tabElement) {
        console.error(`Elementos para la pestaña '${tabId}' no encontrados`);
        return;
    }
    
    // Actualizar botones de navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    btnElement.classList.add('active');
    
    // Actualizar contenido visible
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    tabElement.classList.add('active');
    
    // Almacenar la pestaña actual
    currentTabId = tabId;
    
    // Actualizar vista específica si es necesario
    if (tabId === 'reportes') {
        try {
            actualizarGraficos();
        } catch (error) {
            console.error("Error al actualizar gráficos:", error);
        }
    }
}

// Configurar eventos para modales
function setupModalEvents() {
    try {
        // Modal de equipo
        const modalEquipo = document.getElementById('modal-equipo');
        const btnNewEquipo = document.getElementById('btn-new-equipo');
        const btnCloseModal = document.getElementById('btn-close-modal');
        const btnCancel = document.getElementById('btn-cancel');
        
        if (btnNewEquipo) {
            btnNewEquipo.addEventListener('click', () => {
                abrirModalNuevoEquipo();
            });
        }
        
        if (btnCloseModal) {
            btnCloseModal.addEventListener('click', () => {
                if (modalEquipo) modalEquipo.style.display = 'none';
            });
        }
        
        if (btnCancel) {
            btnCancel.addEventListener('click', () => {
                if (modalEquipo) modalEquipo.style.display = 'none';
            });
        }
        
        // Modal de confirmación
        const modalConfirm = document.getElementById('modal-confirm');
        const btnConfirmClose = document.querySelectorAll('.confirm-close');
        
        if (btnConfirmClose && btnConfirmClose.length > 0) {
            btnConfirmClose.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (modalConfirm) modalConfirm.style.display = 'none';
                });
            });
        }
        
        // Modal de impresión
        const modalPrint = document.getElementById('modal-print');
        const btnPrintClose = document.querySelectorAll('.print-close');
        const btnPrint = document.getElementById('btn-print');
        
        if (btnPrintClose && btnPrintClose.length > 0) {
            btnPrintClose.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (modalPrint) modalPrint.style.display = 'none';
                });
            });
        }
        
        if (btnPrint) {
            btnPrint.addEventListener('click', () => {
                imprimirComprobante();
            });
        }
        
        // Modal de detalles
        const modalDetalles = document.getElementById('modal-detalles');
        const btnDetallesClose = document.querySelectorAll('.detalles-close');
        
        if (btnDetallesClose && btnDetallesClose.length > 0) {
            btnDetallesClose.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (modalDetalles) modalDetalles.style.display = 'none';
                });
            });
        }
        
        // Botón de reseteo
        const btnReset = document.getElementById('btn-reset');
        if (btnReset) {
            btnReset.addEventListener('click', () => {
                confirmarResetearSistema();
            });
        }
    } catch (error) {
        console.error("Error en setupModalEvents:", error);
    }
}

// Configurar eventos de búsqueda
function setupSearchEvents() {
    try {
        const searchInput = document.getElementById('search-input');
        const btnSearch = document.getElementById('btn-search');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                filtroTexto = e.target.value.toLowerCase();
                actualizarVistas();
            });
        }
        
        if (btnSearch) {
            btnSearch.addEventListener('click', () => {
                actualizarVistas();
            });
        }
    } catch (error) {
        console.error("Error en setupSearchEvents:", error);
    }
}

// Configurar eventos del formulario
function setupFormEvents() {
    try {
        const equipoForm = document.getElementById('equipo-form');
        const btnBuscarCliente = document.getElementById('btn-buscar-cliente');
        const realizoAbono = document.getElementById('realizoAbono');
        const detallesAbono = document.getElementById('detalles-abono');
        const fotoEntrada = document.getElementById('fotoEntrada');
        const fotoSalida = document.getElementById('fotoSalida');
        const previewFotoEntrada = document.getElementById('preview-fotoEntrada');
        const previewFotoSalida = document.getElementById('preview-fotoSalida');
        const btnPrevTab = document.getElementById('btn-prev-tab');
        const btnNextTab = document.getElementById('btn-next-tab');
        const formTabBtns = document.querySelectorAll('.form-tab-btn');
        
        // Evento de envío del formulario
        if (equipoForm) {
            equipoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                guardarEquipo();
            });
        }
        
        // Evento de búsqueda de cliente
        if (btnBuscarCliente) {
            btnBuscarCliente.addEventListener('click', () => {
                buscarCliente();
            });
        }
        
        // Evento para mostrar/ocultar detalles de abono
        if (realizoAbono && detallesAbono) {
            realizoAbono.addEventListener('change', () => {
                detallesAbono.style.display = realizoAbono.checked ? 'block' : 'none';
            });
        }
        
        // Eventos para previsualizar fotos
        if (fotoEntrada && previewFotoEntrada) {
            fotoEntrada.addEventListener('change', (e) => {
                mostrarPrevisualizacion(e.target, previewFotoEntrada);
            });
        }
        
        if (fotoSalida && previewFotoSalida) {
            fotoSalida.addEventListener('change', (e) => {
                mostrarPrevisualizacion(e.target, previewFotoSalida);
            });
        }
        
        // Eventos para navegación de pestañas
        if (btnPrevTab) {
            btnPrevTab.addEventListener('click', () => {
                cambiarTabNavegacion('prev');
            });
        }
        
        if (btnNextTab) {
            btnNextTab.addEventListener('click', () => {
                cambiarTabNavegacion('next');
            });
        }
        
        // Eventos para botones de pestañas
        if (formTabBtns && formTabBtns.length > 0) {
            formTabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const tabId = btn.getAttribute('data-tab');
                    if (tabId) {
                        mostrarTab(tabId);
                    }
                });
            });
        }
        
        // Inicializar fecha actual en el formulario
        const fechaInput = document.getElementById('fecha');
        if (fechaInput) {
            fechaInput.value = new Date().toISOString().split('T')[0];
        }
    } catch (error) {
        console.error("Error en setupFormEvents:", error);
    }
}

// Mostrar previsualización de imagen
function mostrarPrevisualizacion(input, previewElement) {
    if (!input || !previewElement) return;
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            previewElement.innerHTML = `<img src="${e.target.result}" alt="Vista previa">`;
            previewElement.classList.add('has-image');
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Mostrar pestaña seleccionada
function mostrarTab(tabId) {
    if (!tabId) return;
    
    try {
        // Actualizar botones de pestañas
        document.querySelectorAll('.form-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeTabBtn = document.querySelector(`.form-tab-btn[data-tab="${tabId}"]`);
        if (activeTabBtn) {
            activeTabBtn.classList.add('active');
        }
        
        // Actualizar contenido visible
        document.querySelectorAll('.form-tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTabContent = document.getElementById(`tab-${tabId}`);
        if (activeTabContent) {
            activeTabContent.classList.add('active');
        }
        
        // Actualizar visibilidad de botones de navegación
        const btnPrevTab = document.getElementById('btn-prev-tab');
        const btnNextTab = document.getElementById('btn-next-tab');
        const tabs = Array.from(document.querySelectorAll('.form-tab-btn'));
        
        if (tabs.length > 0) {
            const currentIndex = tabs.findIndex(tab => tab.getAttribute('data-tab') === tabId);
            
            if (btnPrevTab) {
                btnPrevTab.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
            }
            
            if (btnNextTab) {
                btnNextTab.style.visibility = currentIndex === tabs.length - 1 ? 'hidden' : 'visible';
            }
        }
        
        // Guardar pestaña actual
        currentFormTab = tabId;
    } catch (error) {
        console.error("Error en mostrarTab:", error);
    }
}

// Cambiar a la pestaña anterior o siguiente
function cambiarTabNavegacion(direccion) {
    if (!direccion) return;
    
    try {
        const tabs = Array.from(document.querySelectorAll('.form-tab-btn'));
        if (tabs.length === 0) return;
        
        const currentTab = document.querySelector('.form-tab-btn.active');
        if (!currentTab) return;
        
        const currentIndex = tabs.indexOf(currentTab);
        
        let nuevoIndex;
        if (direccion === 'prev') {
            nuevoIndex = Math.max(0, currentIndex - 1);
        } else {
            nuevoIndex = Math.min(tabs.length - 1, currentIndex + 1);
        }
        
        const nuevoTabId = tabs[nuevoIndex].getAttribute('data-tab');
        if (nuevoTabId) {
            mostrarTab(nuevoTabId);
        }
    } catch (error) {
        console.error("Error en cambiarTabNavegacion:", error);
    }
}

// Actualizar todas las vistas
function actualizarVistas() {
    try {
        actualizarTablaRecepcion();
        actualizarKanban();
        actualizarTablaEntrega();
        actualizarTablaClientes();
        actualizarEstadisticas();
    } catch (error) {
        console.error("Error al actualizar vistas:", error);
    }
}

// Filtrar equipos según la búsqueda
function filtrarEquipos() {
    if (!filtroTexto) return equipos;
    
    return equipos.filter(equipo => {
        const searchLower = filtroTexto.toLowerCase();
        return (
            (equipo.nombreCliente && equipo.nombreCliente.toLowerCase().includes(searchLower)) ||
            (equipo.serial && equipo.serial.toLowerCase().includes(searchLower)) ||
            (equipo.estado && equipo.estado.toLowerCase().includes(searchLower)) ||
            (equipo.marca && equipo.marca.toLowerCase().includes(searchLower)) ||
            (equipo.modelo && equipo.modelo.toLowerCase().includes(searchLower)) ||
            (equipo.problema && equipo.problema.toLowerCase().includes(searchLower)) ||
            (equipo.celular && equipo.celular.includes(searchLower))
        );
    });
}

// Actualizar tabla de recepción
function actualizarTablaRecepcion() {
    const tablaBody = document.getElementById('recepcion-table-body');
    if (!tablaBody) {
        console.error("Elemento 'recepcion-table-body' no encontrado");
        return;
    }
    
    const equiposFiltrados = filtrarEquipos().filter(equipo => 
        ['Recibido', 'En revisión'].includes(equipo.estado)
    );
    
    let html = '';
    
    if (equiposFiltrados.length === 0) {
        html = `<tr><td colspan="7" class="text-center">No hay equipos en recepción</td></tr>`;
    } else {
        equiposFiltrados.forEach(equipo => {
            html += `
                <tr>
                    <td>${equipo.id || ''}</td>
                    <td>${formatearFecha(equipo.fecha)}</td>
                    <td>
                        ${equipo.nombreCliente || ''}
                        <br>
                        <small class="text-medium">${equipo.celular || ''}</small>
                    </td>
                    <td>
                        ${equipo.marca || ''} ${equipo.modelo || ''}
                        <br>
                        <small class="text-medium">S/N: ${equipo.serial || ''}</small>
                    </td>
                    <td>${equipo.problema || ''}</td>
                    <td>
                        <span class="status-badge status-${clasePorEstado(equipo.estado)}">
                            ${equipo.estado || 'Recibido'}
                        </span>
                    </td>
                    <td>
                        <button class="icon-button" style="background-color: #3b82f6;" onclick="editarEquipo(${equipo.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="icon-button" style="background-color: #10b981;" onclick="verDetallesEquipo(${equipo.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="icon-button" style="background-color: #ef4444;" onclick="confirmarEliminarEquipo(${equipo.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="icon-button" style="background-color: #6b7280;" onclick="abrirModalImpresion(${equipo.id})">
                            <i class="fas fa-print"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    }
    
    tablaBody.innerHTML = html;
}

// Actualizar vista de kanban
function actualizarKanban() {
    try {
        const equiposFiltrados = filtrarEquipos();
        const estados = ['Recibido', 'En revisión', 'En reparación'];
        
        estados.forEach(estado => {
            const estadoKey = estado === 'En revisión' ? 'revision' : 
                            estado === 'En reparación' ? 'reparacion' : 
                            estado.toLowerCase();
            
            const kanbanItems = document.getElementById(`kanban-${estadoKey}`);
            const countElement = document.getElementById(`count-${estadoKey}`);
            
            if (!kanbanItems || !countElement) {
                console.error(`Elementos para kanban estado '${estadoKey}' no encontrados`);
                return;
            }
            
            const equiposEstado = equiposFiltrados.filter(e => e.estado === estado);
            
            // Actualizar contador
            countElement.textContent = equiposEstado.length;
            
            let html = '';
            if (equiposEstado.length === 0) {
                html = `<div class="text-center" style="padding: 20px; color: var(--text-light);">No hay equipos en este estado</div>`;
            } else {
                equiposEstado.forEach(equipo => {
                    html += `
                        <div class="kanban-item">
                            <div class="kanban-item-header">
                                <div>
                                    <div class="kanban-item-title">${equipo.marca || ''} ${equipo.modelo || ''}</div>
                                    <div class="kanban-item-subtitle">Cliente: ${equipo.nombreCliente || ''}</div>
                                </div>
                            </div>
                            <div class="kanban-item-details">
                                S/N: ${equipo.serial || ''}
                                ${equipo.tecnico ? `<br>Técnico: ${equipo.tecnico}` : ''}
                            </div>
                            <div class="kanban-item-problem">${equipo.problema || ''}</div>
                            <div class="kanban-item-actions">
                                <button class="icon-button" style="background-color: #3b82f6;" onclick="editarEquipo(${equipo.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="icon-button" style="background-color: #10b981;" onclick="verDetallesEquipo(${equipo.id})">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="icon-button" style="background-color: #f59e0b;" onclick="avanzarEstado(${equipo.id})">
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    `;
                });
            }
            
            kanbanItems.innerHTML = html;
        });
    } catch (error) {
        console.error("Error en actualizarKanban:", error);
    }
}

// Actualizar tabla de entrega
function actualizarTablaEntrega() {
    const tablaBody = document.getElementById('entrega-table-body');
    if (!tablaBody) {
        console.error("Elemento 'entrega-table-body' no encontrado");
        return;
    }
    
    const equiposFiltrados = filtrarEquipos().filter(equipo => 
        ['Listo para entrega', 'Entregado'].includes(equipo.estado)
    );
    
    let html = '';
    
    if (equiposFiltrados.length === 0) {
        html = `<tr><td colspan="5" class="text-center">No hay equipos listos para entrega o entregados</td></tr>`;
    } else {
        equiposFiltrados.forEach(equipo => {
            html += `
                <tr>
                    <td>${equipo.id || ''}</td>
                    <td>
                        ${equipo.nombreCliente || ''}
                        <br>
                        <small class="text-medium">${equipo.celular || ''}</small>
                    </td>
                    <td>
                        ${equipo.marca || ''} ${equipo.modelo || ''}
                        <br>
                        <small class="text-medium">S/N: ${equipo.serial || ''}</small>
                    </td>
                    <td>
                        <span class="status-badge status-${clasePorEstado(equipo.estado)}">
                            ${equipo.estado || ''}
                        </span>
                    </td>
                    <td>
                        <div style="display: flex; gap: 8px;">
                            <button class="icon-button" style="background-color: #10b981;" onclick="verDetallesEquipo(${equipo.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${equipo.estado === 'Listo para entrega' ? 
                                `<button class="btn-primary" onclick="registrarEntrega(${equipo.id})">
                                    <i class="fas fa-check"></i> Registrar Entrega
                                </button>` : 
                                `<span class="text-medium">
                                    Entregado el ${formatearFecha(equipo.fechaEntrega)}
                                </span>`
                            }
                        </div>
                    </td>
                </tr>
            `;
        });
    }
    
    tablaBody.innerHTML = html;

}