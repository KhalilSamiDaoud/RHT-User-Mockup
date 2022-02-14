const TRIGGERS = document.querySelectorAll('.modal-trigger');
const DOC_BODY = document.getElementsByTagName('body')[0];

const MODAL_OVERLAY = document.createElement('div');
MODAL_OVERLAY.setAttribute('class', 'modal-overlay');
MODAL_OVERLAY.setAttribute('id', 'modal_overlay');

const modals = new Map();

let activeModal = null;

function initModals() {
    TRIGGERS.forEach(trigger => {
        let target = trigger.dataset.target;
        let elem = document.getElementById(target);
        if (elem) {
            modals.set(target, new Modal(target, trigger, elem));
        }
        else
            console.warn('No valid modal target found: ' + target);
    });

    MODAL_OVERLAY.addEventListener('click', Modal.handleCloseModal);
}

class Modal {
    constructor(id, trigger, modal) {
        this.id = id;
        this.trigger = trigger;
        this.modal = modal;

        this.isOpen = false;
        this.dismissable = (this.modal.hasAttribute('data-persist')) ? false : true;
        this.closers = this.modal.querySelectorAll('.close');

        this.trigger.addEventListener('click', this.open.bind(this));

        [...this.closers].forEach( closer => {
            closer.addEventListener('click', Modal.handleCloseModal.bind(this));
        });
    }

    open() {
        activeModal = this;
        let isOverlay = false;

        modals.forEach(entry => {
            if (entry.isOpen) {
                entry.modal.style.visibility = 'collapse';
                entry.isOpen = false;

                isOverlay = true;
            }
        });

        this.modal.style.visibility = 'visible';
        this.isOpen = true;

        if (!isOverlay) {
            DOC_BODY.appendChild(MODAL_OVERLAY);
            DOC_BODY.style.overflow = 'hidden';
        }
    }

    static handleCloseModal(e) {
        if (e.currentTarget === MODAL_OVERLAY) {
            if (!activeModal.dismissable) return;
        }

        modals.forEach( entry => {
            if(entry.isOpen) {
                entry.modal.style.visibility = 'collapse';
                entry.isOpen = false;
            }
        });

        DOC_BODY.removeChild(MODAL_OVERLAY);
        DOC_BODY.style.overflow = 'initial';

        activeModal = null;
    }
}

export { initModals, modals };