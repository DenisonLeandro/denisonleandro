// Shared public content (practice areas, lawyers) used by pages and by /llms.txt.
export interface Area { slug: string; title: string; name: string; intro: string; items: string[] }
export interface Lawyer { slug: string; name: string; role: string; oab: string; specialty: string }

export const AREAS: Area[] = [
  {
    "slug": "bancario",
    "title": "Bancário e Financeiro",
    "name": "Direito Bancário e Financeiro",
    "intro": "Atuação em discussões bancárias e financeiras, em defesa de pessoas físicas e jurídicas frente a instituições financeiras.",
    "items": [
      "Revisão e apuração judicial da correta atualização de valores tomados de instituições financeiras, podendo resultar na devolução de quantias pagas a maior, preservando o patrimônio da empresa e dos sócios",
      "Revisão de contratos e passivos bancários em diversas modalidades de empréstimos e financiamentos de bens móveis (veículos e equipamentos) e imóveis, visando a limitação das taxas de juros (juros capitalizados), multas, adequação à legislação vigente e às normas do Banco Central, e o cancelamento de inscrição nos órgãos de restrição (SPC, Serasa, Sisbacen, CCF, Cadin)"
    ]
  },
  {
    "slug": "consumidor",
    "title": "Consumidor",
    "name": "Direito do Consumidor",
    "intro": "Defesa do consumidor em demandas judiciais e administrativas, com base no Código de Defesa do Consumidor.",
    "items": [
      "Resolução de disputas por meio de atuação judicial e junto às principais câmaras setoriais e de arbitragem e mediação",
      "Orientação em questões perante órgãos de proteção ao consumidor e acompanhamento de processos administrativos e judiciais envolvendo reclamações e pedidos de indenização"
    ]
  },
  {
    "slug": "contratos",
    "title": "Contratos",
    "name": "Contratos",
    "intro": "Elaboração, revisão e análise de contratos cíveis e empresariais, com atuação preventiva para reduzir riscos.",
    "items": [
      "Compra e venda de bens móveis e imóveis",
      "Locação, leasing, arrendamento e comodato",
      "Garantias",
      "Franquia",
      "Licenciamento",
      "Distribuição, agência e representação comercial",
      "Prestação de serviço",
      "Fornecimento, empreitada, EPC, entre outros",
      "Análise de cláusulas contratuais específicas",
      "Opiniões legais sobre contratos e cláusulas contratuais"
    ]
  },
  {
    "slug": "familia",
    "title": "Família",
    "name": "Direito de Família e Sucessões",
    "intro": "Atendimento sensível e técnico em Direito de Família e Sucessões, com foco em soluções consensuais sempre que possível.",
    "items": [
      "Alimentos (concessão, revisão, exoneração e execução)",
      "Casamento (regime de bens e pacto antenupcial)",
      "União estável (reconhecimento e dissolução)",
      "Medida cautelar de separação de corpos",
      "Divórcio",
      "Filiação (adoção e investigação de paternidade)",
      "Guarda e regulamentação de visita de menores",
      "Interdição",
      "Doação",
      "Planejamento familiar e sucessório",
      "Inventário e arrolamento",
      "Medida cautelar de arrolamento de bens",
      "Partilha de bens",
      "Testamentos",
      "Tutela",
      "Cessão de herança"
    ]
  },
  {
    "slug": "previdenciario",
    "title": "Previdenciário",
    "name": "Direito Previdenciário",
    "intro": "Assessoria e representação em benefícios, contribuições e demandas perante o INSS, Receita Federal e Justiça Federal.",
    "items": [
      "Concessão de aposentadorias por tempo de contribuição, idade, invalidez e especiais (atividades insalubres e periculosas)",
      "Pensões por morte",
      "Auxílio-doença (acidentário e previdenciário)",
      "Conversão de auxílio-doença em aposentadoria por invalidez",
      "Declaração de contagem de tempo de serviço/contribuição",
      "Reconhecimento de período contributivo",
      "Orientação preventiva e atendimento às fiscalizações da Receita Federal do Brasil",
      "Ações declaratórias de direitos e ações anulatórias de débitos fiscais previdenciários",
      "Defesas em execuções fiscais propostas pela Previdência Social, Receita Federal e Caixa Econômica Federal",
      "Recuperação de contribuições sociais indevidamente recolhidas",
      "Defesas em processos instaurados pela Previdência Social ou Receita Federal",
      "Formalização de consultas aos órgãos competentes"
    ]
  },
  {
    "slug": "saude",
    "title": "Direito da Saúde",
    "name": "Direito da Saúde e Direito Médico",
    "intro": "Orientação e defesa de pacientes e familiares em negativas de plano de saúde, medicamentos de alto custo, reajustes, cancelamentos, erro médico e acesso a tratamentos pelo SUS. Atendimento online em todo o Brasil e presencial em Londrina-PR.",
    "items": []
  },
  {
    "slug": "trabalhista",
    "title": "Trabalhista",
    "name": "Direito Trabalhista",
    "intro": "Atuação completa em Direito do Trabalho, defendendo empregados e empregadores em demandas judiciais, consultivas e estratégicas.",
    "items": [
      "Elaboração de reclamatórias trabalhistas",
      "Avaliação e reivindicação de irregularidades em contrato de trabalho, rescisões, férias, horas extraordinárias, reenquadramento salarial, plano de carreira, justa causa, equiparação salarial, reintegração, danos morais, LER (lesões por esforços repetitivos), assédio moral, entre outros",
      "Elaboração de defesas judiciais e acompanhamento processual em todas as instâncias (processos individuais, ações civis públicas, dissídios coletivos)",
      "Acompanhamento personalizado em todos os tribunais",
      "Elaboração de opiniões legais em matéria trabalhista",
      "Elaboração de documentos trabalhistas, instrumentos de contratação, acordos coletivos, políticas internas, planos de participação nos lucros ou resultados",
      "Análise de rotinas e contingências trabalhistas em projetos de cisões, fusões e aquisições",
      "Assessoria em gerenciamento de RH",
      "Realização de negociações coletivas",
      "Realização de workshops e seminários",
      "Avaliação de passivos trabalhistas"
    ]
  }
];

export const LAWYERS: Lawyer[] = [
  {
    "slug": "denison-henrique-leandro",
    "name": "Dr. Denison Leandro",
    "role": "Sócio Fundador",
    "oab": "OAB/PR 28.764",
    "specialty": "especialista em Direito do Trabalho, pós-graduado pela FGV; pós-graduado em Direito da Saúde e Direito Médico pelo Hospital Israelita Albert Einstein"
  },
  {
    "slug": "marcio-barbosa-da-silva",
    "name": "Dr. Márcio Barbosa da Silva",
    "role": "Advogado",
    "oab": "OAB/PR 52.894",
    "specialty": "especialista em Direito do Trabalho e Previdenciário"
  },
  {
    "slug": "renata-henrique-leandro",
    "name": "Dra. Renata Henrique Leandro",
    "role": "Advogada",
    "oab": "OAB/PR 77.170",
    "specialty": "pós-graduada em Mediação, Conciliação e Arbitragem"
  },
  {
    "slug": "higor-henrique-leandro",
    "name": "Dr. Higor Henrique Leandro",
    "role": "Advogado",
    "oab": "OAB/PR 64.072",
    "specialty": "ênfase em Direito do Trabalho"
  },
  {
    "slug": "joao-tadeu-leandro",
    "name": "Dr. João Tadeu Leandro",
    "role": "Advogado",
    "oab": "OAB/PR 67.404",
    "specialty": "ênfase em Direito do Trabalho"
  },
  {
    "slug": "danielle-cristina-mateus-pereira",
    "name": "Dra. Danielle Cristina Mateus Pereira",
    "role": "Advogada",
    "oab": "OAB/PR 57.927",
    "specialty": "ênfase em Direito do Trabalho"
  }
];

export function getArea(slug: string): Area {
  const a = AREAS.find((x) => x.slug === slug);
  if (!a) throw new Error(`Área desconhecida: ${slug}`);
  return a;
}
