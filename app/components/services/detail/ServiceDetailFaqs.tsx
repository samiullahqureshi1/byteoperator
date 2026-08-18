import {useState} from 'react';

export type ServiceDetailFaqItem = {
  question: string;
  answer: string;
};

type ServiceDetailFaqsProps = {
  title: string;
  faqs: readonly ServiceDetailFaqItem[];
};

export function ServiceDetailFaqs({
  title,
  faqs,
}: ServiceDetailFaqsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs.length) return null;

  function toggleItem(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section
      className="ft-service-detail-faqs"
      aria-labelledby="ft-service-detail-faqs-title"
    >
      <div className="ft-service-detail-faqs__container">
        <header className="ft-service-detail-faqs__header">
          <p>FAQs</p>
        </header>

        <div className="ft-service-detail-faqs__inner">
          <div className="ft-service-detail-faqs__left">
            <h2
              className="ft-service-detail-faqs__title"
              id="ft-service-detail-faqs-title"
            >
              {title}
            </h2>
          </div>

          <div className="ft-service-detail-faqs__list">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const panelId = `ft-service-detail-faq-${index}`;

              return (
                <div
                  className="ft-service-detail-faqs__item"
                  data-open={isOpen ? 'true' : 'false'}
                  key={`${faq.question}-${faq.answer}`}
                >
                  <button
                    className="ft-service-detail-faqs__trigger"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(index)}
                  >
                    <span>{faq.question}</span>
                    <PlusIcon />
                  </button>

                  <div
                    className="ft-service-detail-faqs__panel"
                    id={panelId}
                  >
                    <div className="ft-service-detail-faqs__panel-inner">
                      <p className="ft-service-detail-faqs__answer">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PlusIcon() {
  return (
    <svg
      className="ft-service-detail-faqs__plus"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M12 2V22M2 12H22" stroke="currentColor" />
    </svg>
  );
}
