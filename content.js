/* ════════════════════════════════════════════════════════════
   PORTFOLIO CONTENT
   Edit this file to update all text on the site.
   No knowledge of HTML required — plain text only.
════════════════════════════════════════════════════════════ */


// ─── HERO ────────────────────────────────────────────────────
const HERO = {
  name: 'Artem Lebedev',
  tag:  'Data Scientist · Radiochemist · Entrepreneur',
  bio:  `R&D manager specializing in radiopharmaceuticals, radioisotope production, 
  and chemistry automation. Direct responsibility for hiring and budget oversight across complex development programs. 
  PhD in Chemistry from Moscow State University and a Master's in Data Sceince from UC Berkeley.`,
};


// ─── PROJECTS ────────────────────────────────────────────────
// Each entry appears as a card on the page and opens a full-detail modal.
// links: set url to '#' for placeholders not yet filled in.

const PROJECTS = [

  // ── 1. Bacterial Colony Detection ───────────────────────────
  {
    id:         'colonies',
    category:   'Computer Vision',
    title:      'Bacterial Colony Detection on Petri Dish Images',
    shortDesc:  `YOLOv8 model achieving 99% recall at 73% precision — a ~100× workload reduction
for QA specialists reviewing sterility samples in pharmaceutical manufacturing.`,
    cardImage:  'Projects/Project - plates/processed.png',
    modalImage: 'Projects/Project - plates/sample_images.png',
    modalImages: [
      'Projects/Project - plates/1.jpg',
      'Projects/Project - plates/2.jpg',
      'Projects/Project - plates/3.jpg',
      'Projects/Project - plates/4.jpg',
    ],
    tags: ['YOLOv8', 'EfficientNet', 'OpenCV', 'Hough Transform', 'Adaptive Filtering', 'TensorFlow', 'Keras', 'Python'],
    fullText: `
Finding bacterial colonies on Petri dishes is the standard method of controlling sterility in drug manufacturing. A sample is added to a dish filled with agar gel and incubated to promote bacterial growth. For two weeks, technicians check the plate daily. Finding colonies means contamination — a serious problem for pharma manufacturing. This test is highly subjective, and technicians often have conflicting incentives. Pharma companies could benefit from more objective, computer-vision-based records.

This is a recall-driven problem: missing a contaminated plate is far worse than a false positive. The target was at least 99% recall, with precision above ~30% to keep human reviewer workload manageable.

Two approaches were compared: EfficientNet (B0 and B5) for image classification and YOLOv8 for object detection. The best EfficientNet result after fine-tuning was 17% precision at 98% recall — not sufficient for production use, since almost no workload reduction would result.

YOLOv8 proved to be the clear winner: 99% recall at 73% precision. This means only 1 in 100 positive samples is missed, and 3 out of 4 images flagged for human review are true contamination events — roughly a 100-fold workload reduction for QA specialists.

The next step is developing practical hardware for automated sample handling and imaging, as the full value of the model can only be realised in a fully automated workflow.
    `,
    links: [
      { label: 'Read on Medium →', url: 'https://medium.com/@lebedevfedora' },
      { label: 'View Code →',      url: 'https://github.com/ArtemChemist' },
    ],
  },

  // ── 2. Brand Litter Tracker ──────────────────────────────────
  {
    id:         'litter',
    category:   'Computer Vision · Cloud',
    title:      'Brand Litter Tracker — Street Waste Analysis',
    shortDesc:  `Browser extension revealing brand pollution scores at the moment of online purchase,
backed by a multi-class YOLOv8 logo detector trained on 27,000 street-litter images. UC Berkeley MIDS Capstone.`,
    cardImage:  'Projects/Project - recycle/Wolee.PNG',
    modalImage: 'Projects/Project - recycle/Wolee.PNG',
    tags: ['YOLOv8', 'Hierarchical Clustering', 'AWS SageMaker', 'AWS Lambda', 'PostgreSQL', 'Chrome Extension', 'Python'],
    fullText: `
Consumers are constantly told to recycle, but making waste reduction a personal responsibility is misleading. Companies use packaging that theoretically could be recycled but often isn't. In this project we aimed to give consumers the data they need to vote with their dollars for brands that have genuinely reduced their environmental impact.

We built a browser extension that surfaces brand pollution scores at the most opportune moment: the point of online purchase. The data comes from analysis of street litter photos uploaded by users of Open Litter Map. Our slice of the dataset contained 27,000 images with user-supplied tags but no bounding-box annotations.

The biggest challenge was labelling the data. Rather than hand-annotating thousands of images, we combined Logo3kdet (a pre-labelled dataset of marketing logo images), single-class YOLO detection, hierarchical clustering, and human evaluation to generate annotations. We then trained a multi-class YOLOv8 model (mAP 68%) that identifies specific brand logos in street photos and used brand frequencies to derive the pollution ranking shown to users.

The full system ran on AWS infrastructure: EC2 for training, S3 and Postgres RDS for storage, Lambda functions as the API layer, and a SageMaker endpoint hosting the final YOLO model. A novel approach I proposed for interfacing large YOLO models via Lambda was later accepted into Amazon's official guidelines.

The solution has the potential to shift consumer behaviour by providing visual, brand-specific information at the critical moment of purchasing — and the low cross-brand confusion means brands are not unfairly penalised for competitors' packaging.
    `,
    links: [
      { label: 'View Code →',     url: 'https://github.com/ArtemChemist' },
      { label: 'Project Site →',  url: '#' },
    ],
  },

  // ── 3. Flight Delay Prediction ───────────────────────────────
  {
    id:         'delays',
    category:   'Big Data · Machine Learning',
    title:      'Flight Delay Prediction at Scale',
    shortDesc:  `Distributed ensemble model predicting departure delays 2 hours in advance,
trained on 150 GB / 30 M+ flight records with Apache Spark on Databricks.`,
    cardImage:  'Projects/Project - delays/Final pipeline.png',
    modalImage: 'Projects/Project - delays/data_workflow.png',
    tags: ['Apache Spark', 'MLlib', 'Random Forest', 'Logistic Regression', 'MLP', 'Databricks', 'Azure Blob Storage', 'Time Series'],
    fullText: `
The goal was to predict — 2 hours before departure — whether a flight would be delayed, using a dataset of over 30 million flights spanning more than 150 GB. Processing at this scale required a 40-core Databricks cluster with data stored in Azure Blob Storage.

Extensive EDA and ETL pipelines were developed to remove inconsequential features and join disconnected datasets into a single parallelised DataFrame. Key engineered features included average departure delay at the origin airport and the latest known delay of the specific aircraft — care was taken to prevent data leakage across this time-series dataset.

Three models were compared: logistic regression, random forest, and a multi-layer perceptron (MLP). Precision at 80% recall was chosen as the business-relevant metric over F1/F2 scores. Each model was fine-tuned individually before being combined into an ensemble.

The winning ensemble achieved 26.5% precision at 80% recall on the held-out test set, compared to 18% for a random baseline. The modest improvement likely reflects the absence of aircraft maintenance data — a known driver of delays that is not publicly available.
    `,
    links: [
      { label: 'View Code →',      url: 'https://github.com/ArtemChemist' },
      { label: 'Read on Medium →', url: 'https://medium.com/@lebedevfedora' },
    ],
  },

  // ── 4. CO₂ Forecasting ──────────────────────────────────────
  {
    id:         'co2',
    category:   'Time Series',
    title:      'Atmospheric CO₂ Forecasting with SARIMA',
    shortDesc:  `A model built from a 1997 vantage point that predicted CO₂ would exceed 420 ppm in 2024
— a threshold that was actually crossed in 2022, only two years ahead of schedule.`,
    cardImage:  'Projects/Project - CO2/SARIMA forecast.png',
    modalImage: 'Projects/Project - CO2/SARIMA forecast.png',
    tags: ['SARIMA', 'ACF / PACF', 'BIC Model Selection', 'R', 'tidyverse', 'ggplot2', 'Time Series'],
    fullText: `
The goal of this project was twofold: determine whether the recent rise in atmospheric CO₂ is a statistically meaningful trend or could be explained by natural variation, and make predictions from a 1997 perspective — then evaluate them from 2020.

Data came from the Mauna Loa Observatory, the gold standard for atmospheric CO₂ measurement, unique in that its remote location makes it representative of the entire Northern Hemisphere.

A baseline quadratic model with monthly dummy variables captured trend and seasonality but left strong autocorrelation in the residuals. A grid search over SARIMA parameters, using BIC as the selection criterion, yielded SARIMA(1,1,1)(0,1,1)₁₂. To capture the visible acceleration in CO₂ growth, double-differencing was introduced, resulting in the final model SARIMA(1,2,1)(0,1,1)₁₂.

From a 1997 perspective, the model predicted the 420 ppm threshold would be crossed around February 2024. In reality, 420 ppm was first exceeded in February 2022 — the prediction was off by only 2 years over a 25-year horizon, a remarkable result. The model predicted the 500 ppm threshold would most likely be reached around January 2053.

The surprisingly strong performance of a model built on 1997 data suggests that no effective action against CO₂ emissions has materially altered the trend in the intervening 25 years.
    `,
    links: [
      { label: 'View Code →', url: 'https://github.com/ArtemChemist' },
    ],
  },

  // ── 5. Research Paper Impact Predictor ──────────────────────
  {
    id:         'abstracts',
    category:   'NLP',
    title:      'Predicting Research Paper Impact with sciBERT',
    shortDesc:  `sciBERT model that predicts a paper's journal impact factor from title and abstract alone
(r = 0.73), trained on 4,500 radionuclide therapy publications with novel data augmentation.`,
    cardImage:  'Projects/Project - abstracts/Main+Image.PNG',
    modalImage: 'Projects/Project - abstracts/Main+Image.PNG',
    tags: ['sciBERT', 'Transformers', 'NLP', 'Data Augmentation', 'PyTorch', 'Python', 'Radionuclide Therapy'],
    fullText: `
At the end of a research project, scientists face a critical choice: where to publish. Careers depend on landing papers in top journals, but those slots are fiercely competitive. If researchers could predict which journals match their paper's quality, they could make more strategic decisions.

We built a sciBERT-based model that predicts a paper's journal impact factor using only information available at submission — title, abstract, and metadata. The architecture extracts the CLS token from BERT, concatenates trained embeddings for categorical variables with scalar metadata, and feeds the combined vector through a fully connected regression layer.

Trained on 4,500 papers from the field of radionuclide therapy, the model achieved r = 0.73 between predicted and actual journal impact factors. Data augmentation was critical: new abstracts were generated by mixing sentences from papers with similar impact factors, expanding the training set by 10×.

The model tends to predict values closer to a normal distribution, missing two sharp spikes in observed impact factors at 1 and 2.5. Analysis of mispredicted papers suggests a culprit: some lower-ranked journals allow unusually long, detail-heavy abstracts that the model interprets as signs of higher impact.

With over 70% correlation between predicted and observed values, this model gives researchers a solid estimate of where their paper might land. Looking ahead, predicting individual citation counts — rather than journal impact factors — would measure the true value of a single project.
    `,
    links: [
      { label: 'Read on Medium →', url: 'https://medium.com/@lebedevfedora' },
    ],
  },

  // ── 6. Fallypride Microfluidics ──────────────────────────────
  {
    id:         'fallypride',
    category:   'Radiochemistry',
    title:      'Clinical [F-18]-Fallypride via Microfluidic Synthesis',
    shortDesc:  `First human doses of a PET radiotracer produced with microfluidic technology.
Developed and transferred the production and QC protocol to UCSD for clinical trial use. Published in Lab on a Chip.`,
    cardImage:  'Projects/Project - Fallypride/Fallypride.png',
    modalImage: 'Projects/Project - Fallypride/Main-parts-of-the-reactor-assembly-Left-schematic-cross-section-of-the-reactor-cavity_W640.jpg',
    tags: ['Radiochemistry', 'F-18 Labeling', 'PET Imaging', 'Microfluidics', 'HPLC Purification', 'GMP', 'Clinical Production', 'Specific Activity'],
    fullText: `
We were the first in the world to use microfluidic technology to produce radioactive drugs for injection into human subjects. Microfluidic technology theoretically offers several advantages for radiolabeling: reduced precursor usage, faster reactions, higher fluoride concentrations, and easier purification. Despite interest from major companies in the field, none had succeeded in bringing this to clinical use — the materials required for microfluidic chips couldn't withstand aggressive radiofluorination chemistry, and concentrating fluoride activity into microlitres reliably caused significant losses.

The system developed at Siemens used PEEK and ULTEM for all wetted surfaces, solving material compatibility. A miniaturised ion-exchange column achieved >95% efficiency in F-18 fluoride concentration, bridging the micro- and macrofluidic components.

My primary contribution was developing the production and QC protocol. Key challenges included: liquid transfer fidelity (with total volumes as small as 15 μL, losing 1 μL meant 10% efficiency loss); an unpredictable impurity profile due to poor temperature control inside a 45 μL PEEK reactor; and the requirement to avoid toxic solvents to eliminate reformulation after HPLC purification.

I resolved the liquid transfer problem using precise syringe pumps and a robust gas-push sequence. I enhanced the purification system to handle worst-case impurity scenarios using a 4.6×250 mm semi-preparative column on just 1 mg of material. By optimising both the reactor effluent pH and HPLC eluent pH, I replaced acetonitrile with ethanol — making the eluent non-toxic and eliminating the reformulation step.

I also identified that Teflon tubing and Kalrez O-rings were major contributors to low specific activity: with 75 GBq of F-18 concentrated over a few mm² of Teflon, the polymer degraded and released F-19. A weekly preventative maintenance protocol resolved this, enabling specific activities up to 750 GBq/μmol — nearly 5× higher than previously reported.

After successful in-house testing, the process was transferred to the UCSD radiopharmacy, where live patients were treated with material produced by our synthesiser — the world's first clinical doses made with microfluidic technology.
    `,
    links: [
      { label: 'Published in Lab on a Chip →', url: '#' },
    ],
  },

  // ── 7. COX-2 PET Tracer ─────────────────────────────────────
  {
    id:         'cox2',
    category:   'Radiochemistry',
    title:      'Radiochemistry on Electrodes — COX-2 PET Tracer',
    shortDesc:  `Electrochemical radiofluorination of a COX-2 inhibitor for PET imaging of inflammation —
a new synthetic approach that preserves target-binding affinity. Published in PLOS One.`,
    cardImage:  'Projects/Project - COX-2/in+vitro.png',
    modalImage: 'Projects/Project - COX-2/pone.0176606.g008.png',
    tags: ['Electrosynthesis', 'F-18 Radiochemistry', 'COX-2 Inhibitor', 'PET Imaging', 'Inflammation', 'In Vitro / In Vivo', 'Automated Synthesis'],
    fullText: `
Most painkillers — from Tylenol to ibuprofen — work by inhibiting cyclooxygenases, the enzymes that trigger the inflammatory signalling cascade. COX-2, one subtype, is specifically associated with induced inflammation, often linked to cancer. Radiolabelling a COX-2 inhibitor to image inflammation with PET is a compelling idea, but previous attempts were plagued by metabolic instability or loss of binding affinity.

A promising candidate appeared in the original celecoxib chemistry literature: a fluorine atom attached to an electron-rich aromatic ring — a spot known for metabolic robustness. The challenge is that attaching F-18 to an electron-rich heteroaromatic ring is nearly impossible by conventional means.

To solve this, we drew on preparative electrochemistry. The reaction proceeds in three steps: the substrate is oxidised at the electrode to form a cation radical; this reacts with a fluoride source; the resulting neutral radical is oxidised again to a cation, which loses a proton to yield the product. Optimised conditions settled on a pulsed potential profile (−0.5 to +2.7 V), platinum electrodes, and tetrabutylammonium perchlorate as the inert electrolyte, with alkylammonium fluoride as the irreplaceable fluoride source.

To support the electrochemical reaction, deprotection, and purification, I built a remote-controlled automated synthesiser operated from a touchscreen outside the hot cell. It featured subsystems for fluoride preparation, electrochemistry, pre-purification, HPLC purification, and reformulation — capable of producing up to 10 mCi formulated for animal injection.

In vitro validation using macrophage-like cells activated with endotoxin demonstrated that tracer accumulation increased with COX-2 expression and was completely blockable with cold celecoxib — strong evidence of specificity. Metabolism studies in healthy mice showed almost no degradation after 1 hour. Dynamic PET confirmed no bone uptake and rapid clearance within 30 minutes, both excellent signs for a potential imaging agent.

Improvement in specific activity remains the critical next step for clinical translation.
    `,
    links: [
      { label: 'Published in PLOS One →', url: '#' },
    ],
  },

  // ── 8. TracerQC ──────────────────────────────────────────────
  {
    id:         'tracerqc',
    category:   'Startup · Radiopharmacy',
    title:      'TracerQC — Integrated QC Platform for Radiopharmaceuticals',
    shortDesc:  `Co-founded TraceAbility and served as CTO to bring the first fully integrated,
single-button QC platform for radiopharmaceuticals to market. Now sold by LabLogic; protected by 3 US patents.`,
    cardImage:  'Projects/Project - TracerQC/trace-qc.jpg',
    modalImage: 'Projects/Project - TracerQC/process04.jpg',
    tags: ['GMP', 'Radiopharmaceuticals', 'Quality Control', 'FDA Regulatory', 'Analytical Method Validation', 'US Patents', 'Startup / CTO'],
    fullText: `
Quality control is the biggest bottleneck in radiopharmaceutical manufacturing. Unlike conventional drugs made in large batches, radioactive medicines are often produced one dose at a time — yet still require full QC testing. With short-lived isotopes that decay within hours, speed is essential. The conventional approach requires a full lab of standalone instruments and a highly qualified technician, creating constant staffing challenges and compliance risk.

My co-founder and I launched TraceAbility to solve this problem with TracerQC — the first fully integrated, single-button QC platform for radiopharmaceuticals. Rather than automating the existing workflow, we reimagined QC from the ground up: redesigning tests to run on a standard plate reader and automating sample handling with a pipetting robot. No complex bespoke machinery.

As CTO, I built and led the scientific team responsible for the core technology: novel colorimetric indicators for detecting specific organic solvents, a disposable radiation sensor for measuring radiochemical purity, and several other proprietary assays. These are now protected by TraceAbility's patents (US 10895563, 11002717, 11846621) and trade secrets.

The US FDA took strong interest in TracerQC, backing development with significant funding and expert guidance. This came with high expectations around analytical method validation — challenges that ultimately drove me to pursue the MIDS programme at UC Berkeley. Major radiopharma companies piloted the system at select production sites, providing critical real-world feedback.

After completing the development phase and successfully delivering pilot installations, I exited the company. TracerQC is now installed in multiple academic and commercial centres, sold and supported by LabLogic.
    `,
    links: [],
  },

];


// ─── EDUCATION ───────────────────────────────────────────────

const EDUCATION = [

  {
    years:       '2021 – 2024',
    degree:      'Master of Science in Data Science',
    institution: 'University of California, Berkeley',
    thesis:      `Applied programme covering statistics, machine learning, ML engineering, big data,
and computer vision — with hands-on projects in Python, R, Spark, SQL, BERT, and OpenCV.`,
    tags: ['Python', 'Machine Learning', 'Statistics', 'Spark', 'NLP'],
  },

  {
    years:       '2002 – 2005',
    degree:      'Doctor of Philosophy in Chemistry',
    institution: 'Moscow State University',
    thesis:      `Thesis: "New aspects of palladium-catalyzed amination and its application in metallocene synthesis."`,
    tags: ['Organometallic Chemistry', 'Catalysis', 'Polymer Chemistry'],
  },

  {
    years:       '1996 – 2002',
    degree:      'Master of Science in Chemistry',
    institution: 'Higher Chemical College of the Russian Academy of Sciences',
    thesis:      `Thesis: "Palladium-catalyzed vinylation of azoles and other nitrogen nucleophiles."`,
    tags: ['Organic Chemistry', 'Inorganic Chemistry', 'Mathematics'],
  },

];


// ─── EXPERIENCE ──────────────────────────────────────────────

const EXPERIENCE = [
  {
    dates:   '2025 – Present',
    role:    'Director of R&D',
    company: 'BWXT Medical — Kanata, Canada',
    bullets: [
      'Oversee development programs related to isotope production',
      'Manage teams responsible for Ac-225, Pb-212, Ra-226 and Ga-68',
      'Responsible for budget and staffing of the department',
      'Grew R&D department from 4 to 22 people, including 3 line managers',
      'Established development process in production-dominated organisation.',
    ],
  },

  {
    dates:   '2024 – 2025',
    role:    'R&D Scientist, Radiochemist',
    company: 'Canadian Nuclear Laboratories — Chalk River, Canada',
    bullets: [
      'Developed production protocols for Ac-225 radiolabeling of peptides and antibody fragments.',
      'Built ML-based image analysis workflow for biodosimetry assays.',
      'Developed and validated mass-spectrometry techniques for Ac-225 labeled peptides.',
      'Resolved production challenges for Lu-177 / Zr-89 radiolabeled antibodies.',
      'Built an isotope tracking system using Git for distributed access and accountability.',
    ],
  },

  {
    dates:   '2022 – 2024',
    role:    'Manager, Commercial Operations',
    company: 'McMaster Nuclear Reactor — Hamilton, Canada',
    bullets: [
      'Secured and expanded a major Lu-177 processing contract',
      'Ggrew global I-125 sales in Europe and China',
      'Developed a Flask-based sales dashboard for stakeholder reporting.',
      'Negotiated agreements for GMP-compliant Ho-166 manufacturing.',
    ],
  },
  {
    dates:   '2020 – 2022',
    role:    'Career break for additional eduction',
    company: 'UC Berkeley Master in Data Sceince',
    bullets: [
      'Courses in Statistics, Research design, Machine Learning, Time Series, ML Engineering, Data at Scale',
    ],
  },
  {
    dates:   '2015 – 2019',
    role:    'Co-founder & CTO',
    company: 'TraceAbility (TracerQC) — Radiopharmaceutical QC Startup',
    bullets: [
      'Built and led the scientific team behind TracerQC — the first fully integrated, single-button QC system for radiopharmaceuticals.',
      'Developed novel colorimetric assays, a disposable radiation sensor, and proprietary analytical methods',
      'Managed FDA interactions, analytical method validation, and pilot installations at major radiopharma sites.',
      'Exited after successful development phase',
    ],
  },

   {
    dates:   '2013-2015',
    role:    'Associate Project Sceinctist',
    company: 'UC Los Angeles — Los Angeles, USA',
    bullets: [
      'Developed an electrochemistry method for radiofluorinatuon of aromatic molecules',
      'Designed and built a fully automated synthesizer for electrolitic radiofluorination: software, hardware, control boards',
      'Synthesized the first metabolically stable radiolabeled COX-2 inhibitor with nanomolar affinity',
      'Performed in-vivo studies of the molecule, demonstrating potential for inflammation imaging',
    ],
  },

  {
    dates:   '2010-2013',
    role:    'Staff Scientist',
    company: 'Siemens Healthineers — Los Angeles, USA',
    bullets: [
      'Developed and validated for human use production of [F-18]-Fallypride using the world\'s first microfluidic synthesiser approved for clinical use..',
      'Transferred the process to UCSD radiopharmacy, enabling the first clinical trial doses produced with microfluidic technology (published in Lab on a Chip).',
      'Achieved specific activity up to 750 GBq/μmol — nearly 5× the previously reported value.',
      'Actively contributed to the design of radiochemical synthesizers, including CAD modeling and software development',
      'Validated for clinical production 3 synthesis protocols: [F-18]-FLT, [F-18]-HX-4 and Amyvid',
    ],
  },

];
