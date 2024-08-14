const matchDegreeWords = ['degree', "bachelor", "master's"];
const blockedStack = [];

const blockedTitles = [
  ...blockedStack,
  'staff',
  'sr',
  'lead',
  'senior',
  'platform',
  'devops',
  'sdet',
  'junior',
  'chief',
  '.ai',
  'cloud',
  'artificial intelligence',
  'mainframe',
  'qa engineer',
  '.net',
  'drupal',
  'ios',
  'swift',
  'c#',
  'c++',
  'springboot',
  'kotlin',
  'angular',
  'react native',
  'snowflake'
];

const personal = [
  'Oracle',
  'Microsoft',
  'Aha!',
  'Amazon',
  'Netflix',
  'Google',
  'Meta',
  'NVIDIA',
  'Intel Corporation',
  'Red Hat',
  'Gigster',
  'Fanatics', // not into sports
  'Epic'
];

const blockedCompanies = [
  ...personal,
  'Motion Recruitment',
  'Horizontal Talent',
  'REI Systems',
  'Jobot Consulting',
  'CyberCoders',
  'Calyptus',
  'INSPYR Solutions',
  'TTEC Digital',
  'Sphera',
  'Jobot',
  'Dice',
  'Myticas Consulting',
  'Sev1Tech LLC',
  'Koniag Government Services',
  'Revolution Technologies',
  'VASS LATAM',
  'World Wide Technology',
  'Railroad19',
  'Insight Global',
  'Averity',
  'SharpHeads',
  'Encore Technologies',
  'Brooksource',
  'Bright Minds',
  'Raas Infotek',
  'V-Soft Consulting Group, Inc.',
  'Brine Group',
  'The Intersect Group',
  'BrickRed Systems',
  'AllSTEM Connections',
  'Apex Systems',
  'HYR Global Source Inc',
  'Vaco',
  'Booz Allen Hamilton',
  'Lumenalta (formerly Clevertech)',
  'SoftStandard Solutions',
  'eNGINE',
  'Algo Capital Group',
  'Russell Tobin',
  'Charter Global',
  'GradBay',
  'Crypto Recruiters',
  'TEKsystems',
  'Optomi',
  'Phantom',
  'Acclaim Technical Services',
  'Cogent Data Solutions LLC',
  'Axius Technologies Inc.',
  'Addison Group',
  'Offered.ai',
  'MAFÉ Resources',
  'Applied Resource Group',
  'Murphy & Associates, Inc.',
  'Akkodis',
  'Gridiron IT',
  'IDR, Inc.',
  'Consensys',
  'Emerald Resource Group',
  'Abacus Group',
  'The Phoenix Group',
  'W3Global',
  'Acceler8 Talent',
  'SAIC',
  'hackajob',
  'Next Ventures',
  'Burtch Works',
  'No Limit Technology, Inc.',
  'Infotree Global Solutions',
  'Ender-IT',
  'Planet Technology',
  'Trilogy International',
  'Curate Partners',
  'Synergy',
  'Webologix Ltd/ INC',
  'Robert Half',
  'InterEx Group',
  'CAI',
  'Prime Software Technologies, Inc.',
  'Storm3',
  'Apolis',
  'PEOPLE FORCE CONSULTING INC',
  'Mondo',
  'Ascendion',
  'Franklin Fitch',
  'Atlantic Group',
  'DataAnnotation',
  '1st10',
  'Horizontal Digital',
  'Team Remotely Inc',
  'Primarcy Services',
  'EPITEC',
  'Liberty Personnel Services, Inc.',
  'JBL Resources',
  'Yoh, A Day & Zimmermann Company',
  'SquarePeg',
  'ValueLabs',
  'The Davis Companies',
  'Veritas Search Group',
  'Rylem Staffing',
  'OnCorps',
  'Karsun Solutions',
  'CGI',
  'Glocomms',
  'ProFocus Technology',
  'eWorld Enterprise Solutions, Inc.',
  'Kin + Carta',
  'mangrove',
  'RICEFW Technologies Inc',
  'SPECTRAFORCE',
  'Tucows',
  'Talengt Groups',
  'Resultant',
  'West End Workforce',
  'Odyssey Information Services',
  'Piper Companies',
  'CDW',
  'Flash',
  'Talentify.io',
  'Recruiting Associates, Inc.',
  'LexisNexis Risk Solutions',
  'The Judge Group',
  'Perficient',
  'AIMQ DEVELOPMENT LLC',
  'Swift Strategic Solutions Inc',
  'Planned Systems International',
  'RemoteWorker US',
  'Randstad Digital',
  'Crossover',
  'Corps Team',
  'Tential Solutions',
  'Mindlance',
  'Radiansys Inc.',
  'Oxenham Group',
  'OSI Engineering',
  'Unisys',
  'Big Cloud',
  'Roc Search',
  'Centurion Consulting Group, LLC',
  'P&C Global',
  'MethodHub',
  'TalentAnt',
  'Bloom Recruiting',
  'Hitech Advisors',
  'The Carrera Agency',
  'Kapson Talent Solutions',
  'Onward Play',
  'MissionStaff',
  'RiverLink Biz',
  'Luxoft',
  'Braintrust',
  'Adaptive Technology Insights',
  'Net2Source Inc.',
  'Techgene Solutions',
  'Bayside Solutions',
  'Medasource',
  'NeerInfo Solutions',
  'Pursuit Search Group',
  'Underdog.io',
  'Frank Recruitment Group',
  'AMISEC',
  'TekJobs',
  'NextGen Federal Systems',
  'Catapult Solutions Group',
  'Quess US',
  'Digitive',
  'Pyramid Consulting, Inc',
  'CY9',
  'Plain Concepts',
  'Mojo Trek',
  'Staff Agency.com LLC (formerly Delta Hire, LLC)',
  'Delta Hire, LLC',
  'Iridium Software',
  'New York Technology Partners',
  'Dale WorkForce Solutions',
  'Guidehouse',
  'Solomon Page',
  'Kelly Science, Engineering, Technology & Telecom',
  'System One',
  'Alliance of Professionals & Consultants, Inc. (APC)',
  'Quess Corp Limited',
  'Vectorsoft',
  'Keasis',
  'Shimmer HR Consultancy',
  'Talent Groups',
  'Seneca Resources',
  'Vertisystem',
  'BayOne Solutions',
  'Indigo Tech',
  'Quantum World Technologies Inc.',
  'CoreTechs Inc.',
  'Medix Technology',
  'HealthStream',
  'Eliassen Group',
  'Codeworks IT Careers',
  'Mach49',
  'Bee Talent Solutions',
  'Oliver Parks',
  'Appzlogic',
  'Energize Group',
  'Hire With Jarvis',
  'Elsevier',
  'IsoTalent',
  'PrincePerelson and Associates',
  'Brain Gain Recruiting',
  'Global Technical Talent, an Inc. 5000 Company',
  'Parsons Corporation',
  'R2 Global',
  'Ntrepid LLC',
  'Harvey Nash',
  'Clark Davis Associates',
  'Sauce Labs',
  'Medix™',
  'Natsoft',
  'Cordia Resources by Cherry Bekaert',
  'Take2 Consulting, LLC',
  'Mastech Digital',
  'Programmers.io',
  'Generis Tek Inc',
  'Lawrence Harvey',
  'Resolve Tech Solutions',
  'Redfish Technology',
  'Mitchell Martin Inc.',
  'Peraton',
  'Leidos',
  'Precision Technologies',
  'AVI Systems',
  'InfoStride',
  'Paradigm Global Consulting',
  'Actalent',
  'ICF',
  'mroads',
  'Imetris Corporation',
  'IT Resources',
  'Themesoft Inc.',
  'Buchanan Technologies',
  'NAVEX',
  'Pinnacle IT',
  'Taras Technology LLC',
  'Energy Jobline',
  'Iris Software Inc.',
  'Stellar Consulting Solutions, LLC',
  'Beacon Hill Staffing Group',
  'Indotronix International Corporation',
  'StaffChase',
  'Creative Circle',
  'Martineau Recruiting Technology',
  'CBTS',
  'High Country Tech Search',
  'Storm2',
  'Raft',
  'iT Resources Solutions.net,inc',
  'BrainWorks',
  'Hirobe Limited',
  'Blue Pisces Consulting Inc.',
  'SHI International Corp.',
  'DirectViz Solutions, LLC',
  'Arrow Search Partners',
  'HIRECLOUT', // lol
  'StormAI',
  'YRCI',
  'Georgia IT, Inc.',
  'Get It Recruit - Information Technology',
  'RemoteWorker US',
  'Zenoss',
  'ecocareers',
  'The Dignify Solutions, LLC',
  'GatedTalent - Connecting Top Executive Search Firms And Executives',
  'Xyant Consulting',
  'Avtech Solutions Inc',
  'HireKeyz Inc',
  'Glansa LLC',
  'Indium Software',
  'CornerStone Consulting Group, Inc. in Pittsburgh, PA',
  'VMC Soft Technologies, Inc',
  'The Squires Group, Inc.',
  'Pinnacle Group, Inc.',
  'Agility Partners',
  'DataEdge Consulting, Inc.',
  'General Dynamics Information Technology',
  'ECS',
  'Precise Software Solutions, Inc.',
  'Turnberry Solutions',
  'Acquent',
  'Mainz Brady Group',
  'United Software Group Inc',
  'Stanley David and Associates',
  'OLLMOO',
  'Synergis',
  'Phoenix Recruitment',
  'Mercor',
];
