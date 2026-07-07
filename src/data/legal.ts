/**
 * Legal content for /privacy and /terms, tailored to Angola.
 *
 * Original drafting aligned to Angolan norms — the Personal Data Protection Law
 * (Lei n.º 22/11, de 17 de Junho) and its supervisory authority, the Agência de
 * Proteção de Dados (APD). This is a good-faith draft and NOT legal advice; have
 * it reviewed and approved by qualified counsel in Angola before relying on it.
 */
export interface LegalSection {
  heading: { pt: string; en: string };
  body: { pt: string; en: string };
}

export interface LegalDoc {
  updated: string; // ISO date; shown as "last updated"
  intro: { pt: string; en: string };
  sections: LegalSection[];
}

const COMPANY =
  'Alio Analytics, Lda (NIF 5001021800), Rua 49, Bairro Nova Vida, Edifício E-67, Kilamba Kiaxi, Luanda, Angola';

export const PRIVACY: LegalDoc = {
  updated: '2026-07-01',
  intro: {
    pt: `Esta Política de Privacidade explica como a ${COMPANY} ("Alio", "nós") recolhe, utiliza e protege os seus dados pessoais quando visita www.alio.ao ou contacta connosco. Tratamos os dados de acordo com a Lei n.º 22/11, de 17 de Junho (Lei da Protecção de Dados Pessoais) e demais legislação aplicável em Angola.`,
    en: `This Privacy Policy explains how ${COMPANY} ("Alio", "we") collects, uses and protects your personal data when you visit www.alio.ao or contact us. We process data in accordance with Law No. 22/11 of 17 June (Personal Data Protection Law) and other applicable Angolan legislation.`,
  },
  sections: [
    {
      heading: { pt: 'Responsável pelo tratamento', en: 'Data controller' },
      body: {
        pt: `A entidade responsável pelo tratamento dos seus dados é a ${COMPANY}. Para qualquer questão sobre esta política, contacte info@alio.ao.`,
        en: `The entity responsible for processing your data is ${COMPANY}. For any question about this policy, contact info@alio.ao.`,
      },
    },
    {
      heading: { pt: 'Dados que recolhemos', en: 'Data we collect' },
      body: {
        pt: 'Recolhemos os dados que nos fornece directamente através do formulário de contacto (nome, e-mail, serviço de interesse e mensagem) e dados técnicos recolhidos automaticamente (endereço IP, tipo de navegador e páginas visitadas) através de ferramentas de análise.',
        en: 'We collect the data you provide directly through the contact form (name, e-mail, service of interest and message) and technical data collected automatically (IP address, browser type and pages visited) through analytics tools.',
      },
    },
    {
      heading: { pt: 'Finalidades e fundamento legal', en: 'Purposes and legal basis' },
      body: {
        pt: 'Utilizamos os seus dados para responder a pedidos de contacto, prestar os nossos serviços, cumprir obrigações legais e melhorar o site. O tratamento assenta no seu consentimento, na execução de um contrato ou de diligências pré-contratuais, no cumprimento de obrigações legais e no nosso interesse legítimo, conforme aplicável.',
        en: 'We use your data to respond to contact requests, deliver our services, comply with legal obligations and improve the site. Processing is based on your consent, the performance of a contract or pre-contractual steps, compliance with legal obligations, and our legitimate interest, as applicable.',
      },
    },
    {
      heading: { pt: 'Partilha de dados', en: 'Data sharing' },
      body: {
        pt: 'Não vendemos os seus dados. Podemos partilhá-los com prestadores de serviços que actuam em nosso nome (por exemplo, alojamento, envio de formulários e análise), sujeitos a obrigações de confidencialidade, e com autoridades quando exigido por lei.',
        en: 'We do not sell your data. We may share it with service providers acting on our behalf (for example, hosting, form delivery and analytics), subject to confidentiality obligations, and with authorities where required by law.',
      },
    },
    {
      heading: { pt: 'Transferências internacionais', en: 'International transfers' },
      body: {
        pt: 'Alguns prestadores podem tratar dados fora de Angola. Nesses casos, adoptamos salvaguardas adequadas e cumprimos os requisitos legais aplicáveis à transferência internacional de dados.',
        en: 'Some providers may process data outside Angola. In such cases, we adopt appropriate safeguards and comply with the legal requirements applicable to the international transfer of data.',
      },
    },
    {
      heading: { pt: 'Conservação', en: 'Retention' },
      body: {
        pt: 'Conservamos os dados apenas pelo período necessário às finalidades para que foram recolhidos ou conforme exigido por obrigações legais, findo o qual são eliminados ou anonimizados.',
        en: 'We keep data only for as long as necessary for the purposes for which it was collected, or as required by legal obligations, after which it is deleted or anonymised.',
      },
    },
    {
      heading: { pt: 'Segurança', en: 'Security' },
      body: {
        pt: 'Aplicamos medidas técnicas e organizativas razoáveis para proteger os seus dados contra acesso, perda ou divulgação não autorizados.',
        en: 'We apply reasonable technical and organisational measures to protect your data against unauthorised access, loss or disclosure.',
      },
    },
    {
      heading: { pt: 'Os seus direitos', en: 'Your rights' },
      body: {
        pt: 'Nos termos da Lei n.º 22/11, tem direito de acesso, rectificação, actualização, oposição e eliminação dos seus dados, bem como de retirar o consentimento. Para exercer estes direitos, contacte info@alio.ao.',
        en: 'Under Law No. 22/11, you have the right to access, rectify, update, object to and erase your data, as well as to withdraw consent. To exercise these rights, contact info@alio.ao.',
      },
    },
    {
      heading: { pt: 'Cookies', en: 'Cookies' },
      body: {
        pt: 'O site utiliza cookies e tecnologias semelhantes para funcionamento e análise. Pode gerir as preferências de cookies no seu navegador.',
        en: 'The site uses cookies and similar technologies for operation and analytics. You can manage cookie preferences in your browser.',
      },
    },
    {
      heading: { pt: 'Autoridade de controlo', en: 'Supervisory authority' },
      body: {
        pt: 'Tem o direito de apresentar reclamação junto da Agência de Proteção de Dados (APD) de Angola, a autoridade nacional de controlo em matéria de protecção de dados pessoais.',
        en: 'You have the right to lodge a complaint with the Agência de Proteção de Dados (APD) of Angola, the national supervisory authority for personal data protection.',
      },
    },
    {
      heading: { pt: 'Alterações', en: 'Changes' },
      body: {
        pt: 'Podemos actualizar esta política periodicamente. A versão em vigor será sempre publicada nesta página, com a respectiva data de actualização.',
        en: 'We may update this policy from time to time. The version in force will always be published on this page, with its update date.',
      },
    },
  ],
};

export const TERMS: LegalDoc = {
  updated: '2026-07-01',
  intro: {
    pt: `Estes Termos e Condições regem a utilização do site www.alio.ao e dos serviços prestados pela ${COMPANY}. Ao aceder ou utilizar o site, aceita ficar vinculado a estes termos.`,
    en: `These Terms & Conditions govern the use of the www.alio.ao website and the services provided by ${COMPANY}. By accessing or using the site, you agree to be bound by these terms.`,
  },
  sections: [
    {
      heading: { pt: 'Aceitação dos termos', en: 'Acceptance of terms' },
      body: {
        pt: 'A utilização deste site implica a aceitação integral destes termos. Se não concordar, não deverá utilizar o site.',
        en: 'Use of this site implies full acceptance of these terms. If you do not agree, you should not use the site.',
      },
    },
    {
      heading: { pt: 'Serviços', en: 'Services' },
      body: {
        pt: 'A Alio presta serviços de software, dados, GIS, design e transformação digital. O âmbito, prazos e condições de cada projecto são definidos em proposta ou contrato específico.',
        en: 'Alio provides software, data, GIS, design and digital transformation services. The scope, timelines and conditions of each project are defined in a specific proposal or contract.',
      },
    },
    {
      heading: { pt: 'Propriedade intelectual', en: 'Intellectual property' },
      body: {
        pt: 'A marca, logótipo, textos, design e demais conteúdos deste site são propriedade da Alio ou dos respectivos titulares e estão protegidos por lei. Não é permitida a sua utilização sem autorização prévia.',
        en: 'The brand, logo, texts, design and other content on this site are the property of Alio or their respective owners and are protected by law. Their use is not permitted without prior authorisation.',
      },
    },
    {
      heading: { pt: 'Utilização aceitável', en: 'Acceptable use' },
      body: {
        pt: 'Compromete-se a utilizar o site de forma lícita, sem prejudicar o seu funcionamento, a segurança ou os direitos de terceiros.',
        en: 'You agree to use the site lawfully, without harming its operation, security or the rights of third parties.',
      },
    },
    {
      heading: { pt: 'Ligações a terceiros', en: 'Third-party links' },
      body: {
        pt: 'O site pode conter ligações para sites de terceiros. Não somos responsáveis pelo conteúdo ou práticas de privacidade desses sites.',
        en: 'The site may contain links to third-party sites. We are not responsible for the content or privacy practices of those sites.',
      },
    },
    {
      heading: { pt: 'Limitação de responsabilidade', en: 'Limitation of liability' },
      body: {
        pt: 'O site é fornecido "tal como está". Na medida permitida por lei, a Alio não se responsabiliza por danos indirectos decorrentes da utilização do site.',
        en: 'The site is provided "as is". To the extent permitted by law, Alio is not liable for indirect damages arising from the use of the site.',
      },
    },
    {
      heading: { pt: 'Lei aplicável e foro', en: 'Governing law and jurisdiction' },
      body: {
        pt: 'Estes termos regem-se pela lei angolana. Para a resolução de qualquer litígio é competente o foro da Comarca de Luanda, com renúncia a qualquer outro.',
        en: 'These terms are governed by Angolan law. Any dispute shall be subject to the courts of the Judicial District of Luanda, waiving any other jurisdiction.',
      },
    },
    {
      heading: { pt: 'Alterações', en: 'Changes' },
      body: {
        pt: 'Podemos alterar estes termos a qualquer momento. A versão em vigor será publicada nesta página, com a respectiva data.',
        en: 'We may change these terms at any time. The version in force will be published on this page, with its date.',
      },
    },
    {
      heading: { pt: 'Contacto', en: 'Contact' },
      body: {
        pt: 'Para qualquer questão sobre estes termos, contacte info@alio.ao.',
        en: 'For any question about these terms, contact info@alio.ao.',
      },
    },
  ],
};
