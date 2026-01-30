import { styled } from "../../../styled-system/jsx";

export default function PoliticaDePrivacidad() {
  return (
    <Container>
      <Content>
        <Header>
          <h1>Política de Privacidad</h1>
          <span>Última actualización: Enero 2026</span>
        </Header>

        <Section>
          <p>
            En Lockerbol valoramos tu privacidad y nos comprometemos a proteger
            los datos personales que compartes con nosotros al utilizar nuestra
            plataforma.
          </p>
        </Section>

        <Section>
          <h2>Información que recopilamos</h2>
          <p>
            Podemos recopilar información básica del usuario, como nombre,
            correo electrónico y datos relacionados con el uso del servicio,
            necesarios para la gestión de lockers y paquetes.
          </p>
        </Section>

        <Section>
          <h2>Uso de la información</h2>
          <p>
            La información recopilada se utiliza exclusivamente para operar,
            mantener y mejorar el servicio, así como para comunicarnos contigo
            en relación con el uso de la plataforma.
          </p>
        </Section>

        <Section>
          <h2>Protección de datos</h2>
          <p>
            Aplicamos medidas técnicas y organizativas razonables para proteger
            la información personal contra accesos no autorizados, pérdida o
            uso indebido.
          </p>
        </Section>

        <Section>
          <h2>Compartición de información</h2>
          <p>
            Lockerbol no comparte información personal con terceros, salvo
            cuando sea requerido por ley o por autoridades competentes.
          </p>
        </Section>

        <Section>
          <h2>Conservación de los datos</h2>
          <p>
            Los datos personales se conservarán únicamente durante el tiempo
            necesario para cumplir con los fines para los cuales fueron
            recopilados.
          </p>
        </Section>

        <Section>
          <h2>Derechos del usuario</h2>
          <p>
            El usuario puede solicitar el acceso, actualización o eliminación
            de sus datos personales mediante los canales de contacto
            disponibles en la plataforma.
          </p>
        </Section>

        <Section>
          <h2>Cambios en esta política</h2>
          <p>
            Nos reservamos el derecho de actualizar esta Política de Privacidad
            en cualquier momento. Las modificaciones serán publicadas en esta
            página.
          </p>
        </Section>

        <Section>
          <h2>Contacto</h2>
          <p>
            Si tienes dudas sobre esta Política de Privacidad, puedes comunicarte
            con nosotros a través del apartado de soporte.
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
