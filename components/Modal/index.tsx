import style from "./index.module.scss";

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
      <div className={style.modal_main_container}>
        <div className={style.modal_container}>
          <div className={style.modal_header_container}>
            <p className={style.modal_header_title}>{header}</p>
            <span
              className={style.modal_header_close_button}
              onClick={() => setShowModal(!showModal)}
            >
              &times;
            </span>
          </div>
          <div className={style.modal_body_container}>{children}</div>
          {footer && (
            <div className={style.modal_footer_container}>
              <p className={style.modal_footer_text}>{footer}</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  return showModal ? body() : null;
};

export default Modal;
