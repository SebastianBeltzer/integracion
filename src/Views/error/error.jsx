import style from "./error.module.css";

export default function Error() {
  return (
    <div className={style.contenedor}>
      <span className={style.texto}>Error 500. No existe esta direccion.</span>
    </div>
  );
}
