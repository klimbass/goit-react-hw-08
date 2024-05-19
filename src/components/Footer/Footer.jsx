import css from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={css.footer}>
      <h3>Developer: </h3>

      <a
        href="https://www.linkedin.com/in/oleksandr-klimov-3140b9189/"
        target="_blank"
      >
        Oleksandr Klimov
      </a>
      <p>2024</p>
    </div>
  );
}
