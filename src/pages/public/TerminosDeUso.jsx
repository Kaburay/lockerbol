import { styled } from "../../../styled-system/jsx";

export default function TerminosDeUso() {
  return (
    <Container>
      <Content>
        <Header>
          <h1>Términos de Uso</h1>
          <span>Última actualización: Enero 2026</span>
        </Header>

        <Section>
          <p>
            Al acceder y utilizar la plataforma Lockerbol, aceptas cumplir con
            los presentes Términos de Uso. Si no estás de acuerdo con alguno de
            ellos, te recomendamos no utilizar el servicio.
          </p>
        </Section>

        <Section>
          <h2>Uso del servicio</h2>
          <p>
            Lockerbol proporciona una plataforma para la gestión de entrega y
            retiro de paquetes mediante lockers inteligentes. El uso del
            servicio debe realizarse de forma responsable y conforme a la ley
            vigente.
          </p>
        </Section>

        <Section>
          <h2>Responsabilidad del usuario</h2>
          <p>
            El usuario es responsable de la información proporcionada, del
            contenido de los paquetes depositados y del uso adecuado de los
            lockers. Está prohibido almacenar objetos ilegales, peligrosos o que
            infrinjan normativas locales.
          </p>
        </Section>

        <Section>
          <h2>Disponibilidad del sistema</h2>
          <p>
            Lockerbol procura mantener la plataforma operativa, sin embargo no
            garantiza la disponibilidad continua del servicio debido a tareas
            de mantenimiento, fallas técnicas u otros factores externos.
          </p>
        </Section>

        <Section>
          <h2>Limitación de responsabilidad</h2>
          <p>
            Lockerbol no será responsable por pérdidas, daños o retrasos
            derivados del uso del servicio, salvo en los casos establecidos por
            la legislación aplicable.
          </p>
        </Section>

        <Section>
          <h2>Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos Términos de Uso en
            cualquier momento. Las actualizaciones serán publicadas en esta
            página y entrarán en vigencia desde su publicación.
          </p>
        </Section>

        <Section>
          <h2>Contacto</h2>
          <p>
            Para consultas relacionadas con estos términos, puedes comunicarte
            con nosotros a través de los canales de soporte disponibles en la
            plataforma.
          </p>
        </Section>
      </Content>
    </Container>
  );
}

const Container = styled("section", {
  base: {
    minH: "100vh",
    bg: "background",
    color: "textPrimary",
    py: { base: "5rem", md: "7rem" },
  },
});

const Content = styled("div", {
  base: {
    maxW: "900px",
    mx: "auto",
    px: { base: "1.5rem", md: "2rem" },
  },
});

const Header = styled("header", {
  base: {
    mb: "3rem",
    "& h1": {
      fontSize: { base: "2.2rem", md: "2.6rem" },
      fontWeight: 800,
      mb: "0.5rem",
    },
    "& span": {
      fontSize: "0.9rem",
      color: "textSecondary",
    },
  },
});

const Section = styled("section", {
  base: {
    mb: "2.5rem",
    "& h2": {
      fontSize: "1.3rem",
      fontWeight: 700,
      mb: "0.75rem",
    },
    "& p": {
      lineHeight: 1.75,
      color: "textSecondary",
    },
  },
});
