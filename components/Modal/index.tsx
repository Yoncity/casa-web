import "./index.scss";

type Props = {
  header: string;
  children: any;
  footer?: string;
  showModal: boolean;
  setShowModal: (a: boolean) => void;
};

const Modal: React.FC<Props> = ({
  header,
  children,
  footer,
  showModal,
  setShowModal,
}) => {
  const body = () => {
    return (
      <div className="modal-main-container">
        <div className="modal-container">
          <div className="modal-header-container">
            <p className="modal-header-title">{header}</p>
            <span
              className="modal-header-close-button"
              onClick={() => setShowModal(!showModal)}
            >
              &times;
            </span>
          </div>
          <div className="modal-body-container">{children}</div>
          {footer && (
            <div className="modal-footer-container">
              <p className="modal-footer-text">{footer}</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  return showModal ? body() : null;
};

export default Modal;
