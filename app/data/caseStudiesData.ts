export interface CaseStudyItem {
  id: string;
  handle: string;
  title: string;
  subtitle?: string;
  category?: string;
  /** Filter keys for the /work hub; not shown on the case study page. */
  tags: string[];
  /** Technologies used, shown as chips on the case study page. */
  technologies?: string[];
  href?: string;
  result?: { value: string };
  services?: { value: string };
  /** Deprecated: unverified figures were removed. Add only with evidence. */
  metrics?: Array<{ label: string; value: string }>;
  /** Confirmed client or product name; also used in the page schema. */
  client?: string;
  /** Live website, shown as a "Visit Website" button. */
  website?: string;
  /** Show the lead image uncropped (for images that are not 16:9). */
  naturalImage?: boolean;
  /** Closing call-to-action copy for this case study. */
  cta?: { eyebrow?: string; heading: string; description: string[]; hideMedia?: boolean };
  /** A product Byte Operator built itself: described in the page schema. */
  product?: { name: string; url?: string; description: string; dateCreated?: string };
  industry?: string;
  image?: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  };
  logo?: {
    reference?: {
      image?: {
        url: string;
        altText?: string;
        width?: number;
        height?: number;
      };
    };
  };
  intro?: string;
  /** `href` makes the value an external link (new tab). */
  details?: Array<{ label: string; value: string; href?: string }>;
  /** Service pages this project demonstrates (based on its stated services/platform). */
  relatedServices?: Array<{ label: string; path: string }>;
  stats?: Array<{ value: string; label: string }>;
  chapters?: Array<{
    number: string;
    title: string;
    subheading: string;
    /** Optional paragraphs under the chapter heading. */
    body?: string[];
    /** Optional screenshot, shown at its natural aspect ratio. */
    image?: { url: string; altText?: string; width?: number; height?: number };
    points: Array<{ title: string; text: string }>;
  }>;
}

/*
  CASE STUDIES — BYTE OPERATOR
  Proof pages: publish only verifiable information.
  - Numbers (conversion, speed, revenue, uptime, SKUs, users, hours…) were
    removed on 2026-09-27 because none had recorded evidence. Add a figure back
    only with its source, e.g. an analytics export or client sign-off, noted in
    a comment next to it.
  - Replex Engine and Speedify AI are Byte Operator's own products, not client
    engagements; keep them labelled as such.
  - Client names below were confirmed as real Byte Operator clients.
*/
export const CASE_STUDIES: CaseStudyItem[] = [
  {
    /*
      Source: project brief supplied by Byte Operator (2026-09-28).
      Collabix is live at thecollabix.com and in active development.
      No usage, productivity or revenue figures have been verified, so none
      are shown; the numbers visible in the screenshots are demo data.
    */
    id: 'cs-collabix',
    handle: 'collabix',
    title: 'Collabix: Project Management & Team Collaboration Platform',
    subtitle: 'A custom SaaS platform that brings projects, team capacity, time tracking and communication into one workspace',
    category: 'SaaS & Custom Software',
    tags: ['all', 'saas & custom software', 'saas', 'software', 'cloud', 'architecture'],
    technologies: ['Next.js', 'Node.js', 'GraphQL', 'WebSockets'],
    result: { value: 'Custom Project Management & Collaboration SaaS' },
    services: { value: 'Custom SaaS Development / Web Application Engineering / Real-Time Collaboration' },
    client: 'Collabix',
    website: 'https://thecollabix.com/',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/custom_software_case_study.png?v=1790400442&width=1200',
      altText: 'Collabix homepage presenting the platform for running projects, tracking time and managing capacity',
      width: 2048,
      height: 1040,
    },
    intro: 'Byte Operator designed and built Collabix, a custom project management, team collaboration and time-tracking platform that centralises project operations. Agencies, teams and businesses manage their projects, tasks, people, time and communication from one workspace instead of a stack of separate tools.',
    relatedServices: [
      { label: 'Custom Software Development', path: '/services/software-developers' },
      { label: 'SaaS & MVP Development', path: '/services/saas-mvp-development' },
    ],
    details: [
      { label: 'Project', value: 'Collabix' },
      { label: 'Project type', value: 'Custom SaaS' },
      { label: 'Year', value: '2026' },
      { label: 'Status', value: 'Live' },
      { label: 'Website', value: 'thecollabix.com', href: 'https://thecollabix.com/' },
      { label: 'Technologies', value: 'Next.js, Node.js, GraphQL & WebSockets' },
      { label: 'Services', value: 'Custom SaaS Development, Web Application Engineering, Real-Time Collaboration' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Project work spread across too many disconnected tools',
        body: [
          'Agencies and teams often run their work across several separate products: one for tasks and projects, another for chat, another for time tracking, and spreadsheets for workload planning, capacity, meetings and milestones.',
          'When those tools do not talk to each other, workflows become fragmented. It gets harder to see what is happening across projects and people, who has time available, and where the hours are actually going.',
        ],
        points: [
          {
            title: 'Fragmented Workflows',
            text: 'Tasks, conversations, time records and plans live in different places, so people spend time switching between tools and copying information across.',
          },
          {
            title: 'Limited Capacity Visibility',
            text: 'Without a shared view of allocated and remaining hours, it is difficult to tell who is overloaded and who still has room for more work.',
          },
          {
            title: 'Time Disconnected from Work',
            text: 'When time tracking sits outside the project tool, tracked hours are hard to connect back to the projects, tasks and people they belong to.',
          },
        ],
      },
      {
        number: '02',
        title: 'The Solution',
        subheading: 'One connected platform for projects, people, time and communication',
        body: [
          'Collabix was designed as more than a basic task manager. It brings project operations, team capacity, time tracking and communication together in one connected product, so the work, the people doing it and the time it takes are visible in the same place.',
        ],
        points: [
          {
            title: 'Central Project Workspace',
            text: 'Projects, tasks, files and project activity are organised inside structured workspaces.',
          },
          {
            title: 'Kanban Project Management',
            text: 'Tasks move across Kanban boards, with other views of the same work for different ways of planning.',
          },
          {
            title: 'Team Capacity & Workload',
            text: 'Allocated and remaining hours for every team member, across all of their projects.',
          },
          {
            title: 'Time Tracking & Activity',
            text: 'Tracked work sessions with screenshots captured at around 10-minute intervals.',
          },
          {
            title: 'Chat & Meetings',
            text: 'Team chat, project chats, group communication and meeting management alongside the work itself.',
          },
          {
            title: 'Milestones & Progress',
            text: 'Major stages and deliverables tracked with their own status, progress and due dates.',
          },
        ],
      },
      {
        number: '03',
        title: 'Project Management Engine',
        subheading: 'Organising projects and tasks visually',
        body: [
          'Each project lives inside a structured workspace. Tasks are managed on a Kanban-style board where columns reflect the stage of the work, and each card shows its labels, priority, due date, comments, assignee and progress.',
          'The same project can also be viewed as a table, list, Gantt chart or calendar, so teams can plan in whichever view suits the work.',
        ],
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0928/7421/1691/files/8.png?v=1789644057&width=1200',
          altText: 'Collabix project management Kanban board',
          width: 1536,
          height: 1024,
        },
        points: [
          {
            title: 'Structured Workspaces',
            text: 'Projects are grouped inside a workspace, giving the team one central place for all ongoing project activity.',
          },
          {
            title: 'Visual Kanban Boards',
            text: 'Tasks move between stages on the board, so the flow of work is easy to follow and update.',
          },
          {
            title: 'Clear Status & Progress',
            text: 'Team members can see the status, owner and progress of each task at a glance, which makes project workflows easier to understand and manage.',
          },
        ],
      },
      {
        number: '04 · Key Feature',
        title: 'Team Capacity & Workload',
        subheading: 'Seeing who has time available, and who is at their limit',
        body: [
          'Capacity management is one of the features that sets Collabix apart from a standard task tool. Agencies managing several client projects at once need to know how many hours each person has available, how many are already allocated, and how much capacity remains.',
          'Collabix shows each team member’s capacity next to the hours tracked against it, with a utilisation figure and a status showing whether they are available, allocated or at risk of being overloaded. Managers can see this across the whole team and alongside the project timeline, before they commit to new work.',
        ],
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0928/7421/1691/files/6.png?v=1789643508&width=1200',
          altText: 'Collabix team capacity and workload dashboard',
          width: 1428,
          height: 1101,
        },
        points: [
          {
            title: 'Available Hours',
            text: 'Each team member’s working capacity for the period is set out clearly.',
          },
          {
            title: 'Allocated Hours',
            text: 'Hours already committed to projects are shown against that capacity.',
          },
          {
            title: 'Remaining Capacity',
            text: 'The difference between capacity and allocation shows where there is room for more work.',
          },
          {
            title: 'Individual Workload',
            text: 'A utilisation view for each person makes uneven workloads easy to spot.',
          },
          {
            title: 'Project Allocation',
            text: 'Time can be seen per project, helping teams balance people across concurrent client work.',
          },
          {
            title: 'Availability Status',
            text: 'Clear available, allocated and at-risk statuses flag overloaded team members before deadlines slip.',
          },
        ],
      },
      {
        number: '05',
        title: 'Time Tracking & Work Visibility',
        subheading: 'Transparent, shared records of tracked work',
        body: [
          'Collabix includes work-time tracking that ties tracked sessions to the team and project workflows they belong to. A work diary for each person shows elapsed, active, idle and manual time, with each tracked session listed in order.',
          'During tracked sessions, screenshots are captured at approximately 10-minute intervals and shown alongside that session, and team members can add a memo describing what they worked on. For remote and distributed teams, and for agencies reporting time to clients, this gives everyone a clear, shared record of tracked work.',
        ],
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0928/7421/1691/files/11.png?v=1789646420&width=1200',
          altText: 'Collabix time tracking and screenshot activity view',
          width: 1385,
          height: 1136,
        },
        points: [
          {
            title: 'Tracked Work Sessions',
            text: 'Each session is recorded with its start and end time, and separated into active, idle and manual time.',
          },
          {
            title: 'Screenshots at 10-Minute Intervals',
            text: 'Screenshots taken during tracked time give visibility into the activity behind each recorded session.',
          },
          {
            title: 'Connected to Projects',
            text: 'Time records sit inside the same platform as the projects and teams they relate to, rather than in a separate tool.',
          },
        ],
      },
      {
        number: '06',
        title: 'Milestones & Project Progress',
        subheading: 'Tracking major deliverables separately from day-to-day tasks',
        body: [
          'Larger projects are easier to manage when they are organised around their key stages. Milestones in Collabix sit above daily tasks: each has a type, a status, a progress bar, a due date and the tasks linked to it, so the team can see how the project is moving towards its major goals and what needs to be completed next.',
        ],
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0928/7421/1691/files/10.png?v=1789646002&width=1200',
          altText: 'Collabix project milestone management interface',
          width: 1748,
          height: 900,
        },
        points: [
          {
            title: 'Key Stages & Deliverables',
            text: 'Projects can be structured into stages such as discovery, design, development, testing and launch.',
          },
          {
            title: 'Progress Visibility',
            text: 'Status, progress and due dates for every milestone are visible in one list.',
          },
          {
            title: 'Linked to Daily Work',
            text: 'Tasks are linked to milestones, keeping everyday work aligned with the larger goals of the project.',
          },
        ],
      },
      {
        number: '07',
        title: 'Communication & Meetings',
        subheading: 'Conversations that stay next to the work',
        body: [
          'Collabix also includes collaboration features so teams do not have to keep switching between a project management tool and a separate communication system. Discussions, meetings and project work stay connected in the same platform.',
        ],
        points: [
          {
            title: 'Team & Group Chat',
            text: 'Team members can message each other directly or in groups without leaving the workspace.',
          },
          {
            title: 'Project Chats',
            text: 'Each project can have its own conversation, keeping discussion alongside the tasks and files it relates to.',
          },
          {
            title: 'Meeting Management',
            text: 'Meetings are organised inside the platform, next to the projects and people they involve.',
          },
        ],
      },
      {
        number: '08',
        title: 'The Outcome',
        subheading: 'A unified operations platform, live and still growing',
        body: [
          'Byte Operator delivered a unified platform for managing projects, teams, time and communication. Collabix is live at thecollabix.com and continues to be actively developed and improved.',
        ],
        points: [
          {
            title: 'One Connected Platform',
            text: 'Project management, capacity planning, time tracking and communication are connected within the same product.',
          },
          {
            title: 'A Central View of Work & People',
            text: 'Agencies and teams can view project activity and team availability from one central workspace.',
          },
          {
            title: 'Beyond a Standard Task Manager',
            text: 'Collabix supports a broader operational workflow than a standalone task-management tool, from planning and allocation through to tracked time.',
          },
        ],
      },
    ],
  },

  {
    /*
      Source: brief supplied by Byte Operator (2026-09-28): Replex Engine,
      built by Byte Operator in 2025, AI automation platform for lead
      handling, replexengine.com. Feature wording is limited to what the
      product describes publicly: "Email Automation Platform" (site meta)
      and the product page in the image (no-code automation flows, AI
      replies, delays, automated email follow-ups). No metrics, clients,
      integrations, channels or AI models are verified, so none are listed.
    */
    id: 'cs-replex',
    handle: 'replex-engine',
    title: 'Replex Engine',
    subtitle: 'An AI automation platform built to help businesses stay on top of every lead.',
    category: 'AI & Automation',
    tags: ['all', 'ai & automation', 'ai', 'automation', 'lead-capture', 'replex'],
    result: { value: 'AI Automation Platform built by Byte Operator' },
    services: { value: 'AI Automation / Custom Software Development' },
    website: 'https://replexengine.com/',
    naturalImage: true,
    product: {
      name: 'Replex Engine',
      url: 'https://replexengine.com/',
      description:
        'An AI automation platform built by Byte Operator to help businesses manage incoming leads and follow-up, and reduce the risk of leads being missed.',
      dateCreated: '2025',
    },
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/replex.png?v=1790409470&width=1200',
      altText: 'Replex Engine product page headed “Automate your lead replies”',
      width: 2047,
      height: 1007,
    },
    intro: 'Byte Operator built Replex Engine in 2025 as an AI automation platform designed around a common business problem: incoming leads can be missed when lead handling and follow-up depend heavily on manual processes. The platform uses automation to help businesses manage that process more consistently.',
    relatedServices: [
      { label: 'AI Automations & Agents', path: '/services/ai-automations-agents' },
      { label: 'AI Application Development', path: '/services/ai-application-development' },
      { label: 'Custom Software Development', path: '/services/software-developers' },
    ],
    details: [
      { label: 'Product', value: 'Replex Engine' },
      { label: 'Type', value: 'AI Automation Platform' },
      { label: 'Built', value: '2025' },
      { label: 'Built by', value: 'Byte Operator' },
      { label: 'Website', value: 'replexengine.com', href: 'https://replexengine.com/' },
      { label: 'Services', value: 'AI Automation Development, Custom Software Development' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Staying on top of every lead by hand is hard',
        body: [
          'Businesses receive leads through their digital channels, but when every enquiry depends on someone noticing it, replying and remembering to follow up, it becomes difficult to stay on top of every opportunity consistently.',
          'This is the problem Replex Engine was designed to address.',
        ],
        points: [
          {
            title: 'Manual Attention for Every Lead',
            text: 'Each new lead needs someone to pick it up, which turns lead handling into repetitive, manual work.',
          },
          {
            title: 'Delayed or Inconsistent Follow-Up',
            text: 'When replies and follow-ups rely on people finding the time, responses can be slow and follow-up can be uneven.',
          },
          {
            title: 'Overlooked Opportunities',
            text: 'In a busy week, some enquiries can slip through the cracks and never receive the reply they needed.',
          },
        ],
      },
      {
        number: '02',
        title: 'What We Built',
        subheading: 'An AI automation platform for lead handling',
        body: [
          'Byte Operator built Replex Engine as a web-based AI automation platform focused on one job: handling incoming leads and their follow-up more consistently, with less manual work. Businesses sign in to their own Replex Engine account to set up and run their lead automations.',
        ],
        points: [
          {
            title: 'No-Code Automation Flows',
            text: 'Lead-handling automations are built as visual flows, without writing code.',
          },
          {
            title: 'Automated Email Replies',
            text: 'Replies to leads are sent by email as part of an automation flow, rather than drafted and sent one by one.',
          },
          {
            title: 'Timed Follow-Ups',
            text: 'Flows can apply delays, so follow-up emails go out at the chosen point instead of relying on someone to remember.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Role of AI & Automation',
        subheading: 'Reducing the manual work behind every lead',
        body: [
          'Automation takes on the repetitive steps of lead handling, and AI helps with the replies themselves. Together they reduce the manual work involved in keeping up with incoming leads and help businesses stay on top of each opportunity.',
        ],
        points: [
          {
            title: 'Automation Handles the Routine',
            text: 'Routine replies and follow-ups run through automation flows instead of a person’s to-do list.',
          },
          {
            title: 'AI-Generated Replies',
            text: 'AI is used to produce replies to leads within the automation, so a response does not have to be written by hand each time.',
          },
          {
            title: 'Time for the Right Conversations',
            text: 'With the routine steps automated, teams can focus their attention on the leads that need a personal conversation.',
          },
        ],
      },
      {
        number: '04',
        title: 'Built by Byte Operator',
        subheading: 'An AI product designed and built in-house',
        body: [
          'Replex Engine was built by Byte Operator in 2025. It is our own product rather than a client engagement, and it reflects the work we do for clients: designing AI-enabled software around a real business workflow and turning it into a product people can use.',
        ],
        points: [
          {
            title: 'Built In-House',
            text: 'Byte Operator designed and built Replex Engine as its own AI automation platform.',
          },
          {
            title: 'AI Software Development',
            text: 'The platform brings AI into a working product, not a standalone experiment.',
          },
          {
            title: 'Business Process Automation',
            text: 'It automates a real, everyday business process: handling and following up on leads.',
          },
        ],
      },
    ],
    cta: {
      eyebrow: 'AI Automation',
      heading: 'Have an automation idea of your own?',
      description: [
        'Byte Operator builds custom software and AI automation systems around real business workflows.',
        'Tell us about the process you want to automate, and we will help you work out what to build.',
      ],
      hideMedia: true,
    },
  },

  {
    id: 'cs-aydi',
    handle: 'aydi-active',
    title: 'Aydi Active Ecommerce',
    subtitle: 'Activewear Storefront, Custom Theme Architecture & Mobile UX',
    category: 'Ecommerce & Storefronts',
    tags: ['all', 'ecommerce & storefronts', 'fashion', 'storefront', 'cro', 'development'],
    technologies: ['Shopify Plus', 'Liquid', 'Custom Modular Theme', 'Mobile CRO', 'Performance Optimisation'],
    result: { value: 'Custom Shopify Plus Storefront' },
    services: { value: 'Custom Storefront Engineering / High-Velocity Checkout / Mobile UX' },
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225',
      altText: 'Aydi Active high-performance ecommerce storefront and catalog management',
      width: 1920,
      height: 1080,
    },
    intro: 'Byte Operator developed a custom Shopify Plus storefront for Aydi Active, focused on fast mobile product discovery, clear variant selection and a premium brand presentation.',
    relatedServices: [
      { label: 'Shopify Plus & Enterprise', path: '/shopify-plus-agency' },
      { label: 'CRO Audit & Conversion Optimization', path: '/shopify-cro-audit' },
    ],
    details: [
      { label: 'Client', value: 'Aydi Active' },
      { label: 'Industry', value: 'Athletic Wear & Active Lifestyle' },
      { label: 'Platform', value: 'Shopify Plus & Custom Modular Theme' },
      { label: 'Services', value: 'Custom Theme Engineering, Mobile CRO, Performance Tuning' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Mobile friction and slow catalogue filtering on an off-the-shelf theme',
        points: [
          {
            title: 'Mobile Friction',
            text: 'Most shoppers arrived on mobile, where swatch selection was cumbersome and pages loaded slowly.',
          },
          {
            title: 'Brand Elevation',
            text: 'The brand needed an editorial, premium design that reflected its performance apparel.',
          },
          {
            title: 'Slow Catalogue Browsing',
            text: 'Filtering and moving between collections on the off-the-shelf theme was slow, especially on phones.',
          },
        ],
      },
      {
        number: '02',
        title: 'What Byte Operator Did',
        subheading: 'A lightweight modular theme with a sticky cart, rich swatch previews and fast navigation',
        points: [
          {
            title: 'Custom Modular Components',
            text: 'Built responsive product detail modules with video, a size recommendation calculator and quick-buy drawers.',
          },
          {
            title: 'Editorial Brand Design',
            text: 'Designed a premium, editorial storefront that presents the collection the way the brand presents its performance apparel.',
          },
          {
            title: 'Speed Optimization',
            text: 'Removed heavy third-party scripts and added asset preloading for quicker page transitions.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Outcome',
        subheading: 'A faster, mobile-first storefront that reflects the brand',
        points: [
          {
            title: 'Easier Mobile Buying',
            text: 'Swatch previews, the size calculator, quick-buy drawers and a sticky cart replaced the old theme’s multi-step mobile flow.',
          },
          {
            title: 'Leaner Pages',
            text: 'The custom theme ships without the third-party scripts that previously slowed the storefront down.',
          },
          {
            title: 'A Premium Brand Presentation',
            text: 'Product and collection pages now carry the editorial look the brand wanted, on mobile as well as desktop.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-toys',
    handle: 'kids-wonderland',
    title: 'Kids Wonderland Toy Store',
    subtitle: 'Interactive Retail Storefront & Custom Catalogue Discovery',
    category: 'Ecommerce & Storefronts',
    tags: ['all', 'ecommerce & storefronts', 'retail', 'design', 'development'],
    technologies: ['Shopify', 'Liquid', 'Custom Storefront', 'Product Filtering', 'Gift Finder Quiz', 'Cart Drawer'],
    result: { value: 'Gift Finder & Custom Cart Experience' },
    services: { value: 'Modular Storefront Architecture / Gamified Product Filtering / Custom Cart Drawer' },
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/toys.webp?v=1790407473',
      altText: 'Kids Wonderland interactive toy store development',
      width: 1920,
      height: 1080,
    },
    intro: 'Byte Operator redesigned the Kids Wonderland online toy store around easier discovery for gift buyers, with age- and interest-based filtering, an interactive gift finder and a smarter cart.',
    relatedServices: [
      { label: 'Software Website Design', path: '/services/software-web-design' },
    ],
    details: [
      { label: 'Client', value: 'Kids Wonderland' },
      { label: 'Industry', value: 'Toys, Games & Children Retail' },
      { label: 'Platform', value: 'Shopify Custom Architecture' },
      { label: 'Services', value: 'Interactive UI / UX, Age & Interest Filtering, Upsell Engine' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Helping gift buyers find the right toy in a large catalogue',
        points: [
          {
            title: 'Complex Categorization',
            text: 'Shoppers needed to find toys quickly by age group, educational stage, interest and price range.',
          },
          {
            title: 'Checkout Abandonment',
            text: 'Cluttered cart pages caused drop-offs during busy holiday shopping periods.',
          },
          {
            title: 'Buying for Someone Else',
            text: 'Many shoppers were buying a gift for a child and needed guidance on what to choose, not just a long product list.',
          },
        ],
      },
      {
        number: '02',
        title: 'What Byte Operator Did',
        subheading: 'Visual filtering, a personalised gift finder and bundle suggestions',
        points: [
          {
            title: 'Age & Interest Filtering',
            text: 'Visual filters let shoppers narrow the catalogue by age group, educational stage, interest and price range.',
          },
          {
            title: 'Interactive Gift Finder',
            text: 'Built a three-step gift quiz that matches the recipient’s age and hobbies to toy bundles.',
          },
          {
            title: 'Smart Cart Drawer',
            text: 'Added a free-shipping progress bar, gift-wrapping options and relevant add-ons to the cart drawer.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Outcome',
        subheading: 'A simpler path from browsing to checkout for gift buyers',
        points: [
          {
            title: 'Guided Discovery',
            text: 'Age and interest filters and the gift finder give shoppers a clear starting point instead of browsing the whole catalogue.',
          },
          {
            title: 'A Cleaner Cart',
            text: 'The cart drawer replaced the cluttered cart page, keeping shipping progress and add-ons in one place.',
          },
          {
            title: 'Relevant Add-Ons & Bundles',
            text: 'Bundle suggestions and cart add-ons show gift buyers related items at the moment they are ready to check out.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-furniture',
    handle: 'nordic-haven',
    title: 'Nordic Haven Furniture Flagship',
    subtitle: 'Scandinavian Interior Storefront & B2B Wholesale Commerce',
    category: 'Shopify Plus & Migrations',
    tags: ['all', 'shopify plus & migrations', 'furniture', 'enterprise', 'shopify-plus'],
    technologies: ['Shopify Plus', 'Shopify B2B', '3D Product Visualisation', 'Tiered Pricing', 'Custom Theme'],
    result: { value: 'Shopify Plus Storefront & B2B Trade Portal' },
    services: { value: 'Shopify Plus Enterprise Architecture / Room Staging Visualizer / Custom B2B Checkout' },
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/furniture.webp?v=1790407636',
      altText: 'Nordic Haven luxury furniture digital storefront',
      width: 1920,
      height: 1080,
    },
    intro: 'Byte Operator built a Shopify Plus flagship for Nordic Haven, combining Scandinavian brand storytelling, an interactive room and fabric visualiser, and a B2B wholesale ordering portal for trade clients.',
    relatedServices: [
      { label: 'Shopify Plus & Enterprise', path: '/shopify-plus-agency' },
      { label: 'B2B & Wholesale Ecommerce', path: '/services/software-b2b-wholesale' },
    ],
    details: [
      { label: 'Client', value: 'Nordic Haven Living' },
      { label: 'Industry', value: 'Luxury Furniture & Scandinavian Interior Design' },
      { label: 'Platform', value: 'Shopify Plus Enterprise' },
      { label: 'Services', value: 'Enterprise Storefront, B2B Tier Pricing, 3D Product Modeling' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Buyer hesitation on high-ticket furniture, and manual trade ordering',
        points: [
          {
            title: 'Visual Trust & Texture',
            text: 'Customers needed confidence in materials, fabric swatches and dimensions before buying high-ticket pieces online.',
          },
          {
            title: 'Manual Wholesale Processing',
            text: 'Interior designers and commercial trade clients had to email purchase orders manually.',
          },
          {
            title: 'Telling the Brand Story',
            text: 'The brand’s Scandinavian design story needed to come through clearly online, alongside detailed product information.',
          },
        ],
      },
      {
        number: '02',
        title: 'What Byte Operator Did',
        subheading: 'A room and fabric visualiser plus Shopify Plus B2B wholesale pricing',
        points: [
          {
            title: 'Scandinavian Brand Storytelling',
            text: 'Editorial collection and material pages present the range in a calm, Scandinavian style that supports the products rather than competing with them.',
          },
          {
            title: 'Fabric Swatch & Dimension Viewer',
            text: 'Customers can customise wood finishes and fabrics in real time, with 3D product views and scale indicators for each piece.',
          },
          {
            title: 'B2B Trade Portal',
            text: 'Integrated wholesale account approvals, net-30 terms, tiered quantity discounts and tax exemption handling.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Outcome',
        subheading: 'One platform for both retail customers and trade buyers',
        points: [
          {
            title: 'More Confident Buying',
            text: 'Shoppers can see finishes, fabrics and dimensions before committing to a high-ticket purchase.',
          },
          {
            title: 'Digital Trade Ordering',
            text: 'Trade clients now order through the B2B portal with their own pricing and terms, instead of emailing purchase orders.',
          },
          {
            title: 'One Store, Two Audiences',
            text: 'Retail shoppers and trade buyers are served from the same Shopify Plus store, with pricing and terms applied to each trade account.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-omniretail',
    handle: 'omniretail-migration',
    title: 'OmniRetail Global Enterprise Migration',
    subtitle: 'Magento to Shopify Plus Replatforming & SEO Migration',
    category: 'Shopify Plus & Migrations',
    tags: ['all', 'shopify plus & migrations', 'migrations', 'cro', 'seo', 'enterprise'],
    technologies: ['Magento', 'Shopify Plus', 'Data Migration Scripts', '301 Redirect Mapping', 'JSON-LD Structured Data', 'ERP Integration'],
    result: { value: 'Magento to Shopify Plus Migration' },
    services: { value: 'Data Replatforming / 301 Redirect Mapping / High-Converting UI' },
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/shopify_cro_and_migration_store.webp?v=1790407473',
      altText: 'Shopify CRO and enterprise platform migration',
      width: 1920,
      height: 1080,
    },
    intro: 'Byte Operator migrated OmniRetail Global, a multi-brand retailer, from a legacy on-premise Magento setup to Shopify Plus, including product and customer data, ERP connections and a full SEO redirect plan.',
    relatedServices: [
      { label: 'Magento & Adobe Commerce Migration', path: '/services/magento-software-migrations' },
      { label: 'Platform SEO Migrations', path: '/services/ecommerce-seo-migrations' },
    ],
    details: [
      { label: 'Client', value: 'OmniRetail Global' },
      { label: 'Industry', value: 'Multi-Brand Omnichannel Retail' },
      { label: 'Platform', value: 'Magento to Shopify Plus Enterprise' },
      { label: 'Services', value: 'Data Pipeline, 301 SEO Mapping, Custom ERP Connector' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Moving complex enterprise data, ERP connections and search rankings safely',
        points: [
          {
            title: 'High-Risk Data Complexity',
            text: 'A large product catalogue with many variants, years of customer history and multi-warehouse inventory had to move intact.',
          },
          {
            title: 'SEO Vulnerability',
            text: 'Legacy URLs held valuable search rankings that could be lost if the migration broke them.',
          },
          {
            title: 'Connected Back-Office Systems',
            text: 'Inventory and orders had to keep flowing between the new store and the existing ERP from the day the new platform went live.',
          },
        ],
      },
      {
        number: '02',
        title: 'What Byte Operator Did',
        subheading: 'Automated data transformation, a complete 301 redirect map and real-time ERP sync',
        points: [
          {
            title: 'Data Transformation & Validation',
            text: 'Built custom scripts that cleaned, mapped, validated and imported the product and customer data.',
          },
          {
            title: 'SEO Redirect Matrix',
            text: 'Mapped legacy URLs to clean canonical structures and added JSON-LD structured data on the new platform.',
          },
          {
            title: 'Custom ERP Connector',
            text: 'Built a connector that keeps inventory and order data in sync between Shopify Plus and the ERP in real time.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Outcome',
        subheading: 'The business moved from on-premise Magento to Shopify Plus',
        points: [
          {
            title: 'Replatformed with SEO Safeguards',
            text: 'Legacy URLs redirect to their new equivalents, so existing rankings and links point to live pages.',
          },
          {
            title: 'Connected Operations',
            text: 'A custom ERP connector keeps inventory and order data in sync between Shopify Plus and the back office.',
          },
          {
            title: 'Off Legacy Infrastructure',
            text: 'Moving to Shopify Plus, a hosted platform, replaced the on-premise Magento setup the business previously had to host and maintain itself.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-speedify',
    handle: 'speedify-ai',
    title: 'Speedify AI Performance App',
    subtitle: 'In-House Product: Core Web Vitals Optimisation App & Asset Compression',
    category: 'Apps & Tools',
    tags: ['all', 'apps & tools', 'apps', 'speed', 'ai', 'development'],
    technologies: ['Shopify App Bridge', 'Cloudflare Workers', 'Rust', 'Critical CSS', 'AVIF & WebP', 'Real-User Monitoring'],
    result: { value: 'In-House Byte Operator Product' },
    services: { value: 'AI Asset Compression / Script Offloading / Speed Telemetry' },
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/speedify_landing.webp?v=1790408507',
      altText: 'Speedify AI page speed optimizer app dashboard',
      width: 1920,
      height: 1080,
    },
    intro: 'Speedify AI is Byte Operator’s own performance app. We built it in-house to automate critical CSS generation, image compression and JavaScript deferral for ecommerce storefronts.',
    relatedServices: [
      { label: 'Shopify App Development', path: '/services/shopify-app-development' },
      { label: 'Performance & Speed Audits', path: '/services/shopify-audits' },
    ],
    details: [
      { label: 'Type', value: 'In-house product built by Byte Operator' },
      { label: 'Product', value: 'Speedify AI' },
      { label: 'Industry', value: 'Web Performance & Developer Tooling' },
      { label: 'Platform', value: 'Shopify App Bridge, Cloudflare Workers & Rust Engine' },
      { label: 'Services', value: 'App Development, Core Web Vitals Engineering, Telemetry UI' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Problem',
        subheading: 'Third-party scripts and heavy assets slowing down mobile storefronts',
        points: [
          {
            title: 'Core Web Vitals',
            text: 'Core Web Vitals are part of Google’s page experience signals, and slow pages lose shoppers before they buy.',
          },
          {
            title: 'Technical Complexity',
            text: 'Manual speed work needs ongoing developer effort every time a new app or marketing pixel is added.',
          },
          {
            title: 'Third-Party Script Weight',
            text: 'Apps, pixels and widgets add JavaScript that competes with the storefront’s own content while the page loads.',
          },
        ],
      },
      {
        number: '02',
        title: 'What We Built',
        subheading: 'An automated engine that analyses pages and defers non-critical work',
        points: [
          {
            title: 'Critical CSS & Asset Offloading',
            text: 'Generates critical stylesheets on the fly and converts images to modern AVIF and WebP formats.',
          },
          {
            title: 'Script Deferral',
            text: 'Non-critical JavaScript from apps and marketing pixels is deferred so the main content can render first.',
          },
          {
            title: 'Live Telemetry Dashboard',
            text: 'Lets store owners monitor real-user speed metrics and Core Web Vitals in real time.',
          },
        ],
      },
      {
        number: '03',
        title: 'What It Does',
        subheading: 'Automates the performance work that usually needs a developer',
        points: [
          {
            title: 'Automated Optimisation',
            text: 'Critical CSS, image conversion and script deferral run automatically instead of being hand-tuned for each change.',
          },
          {
            title: 'Visible Performance',
            text: 'The telemetry dashboard shows how real visitors experience the store, so problems surface early.',
          },
          {
            title: 'Built for the Shopify Admin',
            text: 'The app runs inside the Shopify admin through App Bridge, so store owners manage performance where they already work.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-swarms',
    handle: 'autonomous-agent-swarms',
    title: 'Autonomous Multi-Agent AI Swarms',
    subtitle: 'Visual Workflow Orchestration, n8n Pipelines & Multi-System Automation',
    category: 'AI & Automation',
    tags: ['all', 'ai & automation', 'ai', 'automation', 'n8n', 'integrations'],
    technologies: ['n8n', 'LLM Agents', 'Webhooks', 'REST APIs', 'ERP Integration', 'CRM Integration'],
    result: { value: 'Multi-Agent Operations Automation' },
    services: { value: 'n8n Pipeline Architecture / Multi-Agent LLM Orchestration / ERP Webhook Sync' },
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/second_autmation_imaeg.webp?v=1790409459',
      altText: 'Autonomous multi-agent task execution and AI workflow swarms',
      width: 1920,
      height: 1080,
    },
    intro: 'Byte Operator designed and implemented multi-agent AI workflows and n8n pipelines for a supply chain and ecommerce logistics client, connecting CRM, ERP, inventory and customer messaging.',
    relatedServices: [
      { label: 'AI Automations & Autonomous Agents', path: '/services/ai-automations-agents' },
      { label: 'API & System Integrations', path: '/services/software-integrations' },
    ],
    details: [
      { label: 'Client', value: 'Enterprise Operations Client' },
      { label: 'Industry', value: 'Supply Chain & Ecommerce Logistics' },
      { label: 'Platform', value: 'n8n, Multi-Agent LLMs, Custom Webhooks' },
      { label: 'Services', value: 'Workflow Engineering, Agent Swarms, API Integration' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Siloed data across ERPs, spreadsheets and support desks, maintained by hand',
        points: [
          {
            title: 'Operational Bottlenecks',
            text: 'Teams spent significant time re-keying order data and resolving sync errors between warehouses.',
          },
          {
            title: 'Slow Exception Handling',
            text: 'Inventory discrepancies and fulfilment delays needed human intervention, which held up shipping.',
          },
          {
            title: 'Siloed Systems',
            text: 'CRM, ERP, inventory and support data lived in separate tools and spreadsheets that did not share information.',
          },
        ],
      },
      {
        number: '02',
        title: 'What Byte Operator Did',
        subheading: 'Specialised AI agents working through visual n8n execution pipelines',
        points: [
          {
            title: 'Agent Task Distribution',
            text: 'Specialised AI agents monitor webhook queues, parse supplier invoices and update inventory counts.',
          },
          {
            title: 'Visual n8n Pipelines',
            text: 'Workflows are built in n8n, so the team can see, follow and adjust each step of the automation visually.',
          },
          {
            title: 'Self-Healing Fallbacks',
            text: 'Automated validation loops correct formatting errors and alert engineers only when anomalies occur.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Outcome',
        subheading: 'Routine data work handled by automated workflows',
        points: [
          {
            title: 'Less Manual Re-Keying',
            text: 'Order, invoice and inventory updates move between systems through the pipelines instead of being entered by hand.',
          },
          {
            title: 'Exceptions Surface Early',
            text: 'Validation loops fix routine formatting issues and escalate genuine anomalies to the team.',
          },
          {
            title: 'Connected Systems',
            text: 'CRM, ERP, inventory and customer messaging now exchange data through the pipelines instead of through manual updates.',
          },
        ],
      },
    ],
  },
];

export function getCaseStudyByHandle(handle: string): CaseStudyItem | undefined {
  const normalized = handle.toLowerCase();
  
  // Direct match or ID match
  const direct = CASE_STUDIES.find((cs) => cs.handle === normalized || cs.id === normalized);
  if (direct) return direct;

  // Legacy aliases for backward compatibility
  if (normalized === 'triangl') return CASE_STUDIES[0];
  if (normalized === 'chimi-eyewear') return CASE_STUDIES[1];
  if (normalized === 'castore') return CASE_STUDIES[2];

  return undefined;
}
