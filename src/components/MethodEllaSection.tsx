import { ArrowRight } from 'lucide-react';
import { InterestOption, METHOD_ELLA_COPY } from '../data/content';

interface MethodEllaSectionProps {
  onSelectElla: (interest: InterestOption) => void;
}

export function MethodEllaSection({ onSelectElla }: MethodEllaSectionProps) {
  return (
    <section
      id="metodo-ella"
      className="bg-[#F5F2EC] text-[#020202] py-16 sm:py-24 border-b border-[#3B3937]/12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 border border-[#3B3937]/15 bg-white p-7 sm:p-9">
            <p className="text-xs font-medium text-[#A46E28] mb-4">
              {METHOD_ELLA_COPY.identification}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#020202] mb-2">
              {METHOD_ELLA_COPY.brandTitle}
            </h2>
            <p className="text-sm sm:text-base font-medium text-[#7F2C23] mb-8">
              {METHOD_ELLA_COPY.descriptor}
            </p>

            <div className="pt-6 border-t border-[#3B3937]/12">
              <p className="text-xs text-[#3B3937]/80 mb-3">
                Cuatro ejes integrados
              </p>
              <div className="grid grid-cols-2 gap-3">
                {METHOD_ELLA_COPY.pillars.map((pillar, index) => (
                  <div
                    key={pillar}
                    className="py-2 px-3 bg-[#F5F2EC] text-sm font-medium text-[#020202] flex items-center gap-2"
                  >
                    <span className="text-xs font-semibold text-[#A46E28] tabular-nums">
                      0{index + 1}
                    </span>
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3
              className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#020202] leading-[1.2] mb-6"
              style={{ textWrap: 'balance' }}
            >
              {METHOD_ELLA_COPY.title}
            </h3>

            <div className="space-y-4 text-base sm:text-lg text-[#3B3937] leading-relaxed mb-8">
              {METHOD_ELLA_COPY.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div>
              <a
                href="#contacto"
                onClick={() => onSelectElla('Método ELLA')}
                className="inline-flex items-center gap-3 min-h-[46px] px-6 py-3 bg-[#020202] hover:bg-[#3B3937] text-[#F5F2EC] text-sm sm:text-base font-medium rounded-sm transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A46E28]"
              >
                <span>{METHOD_ELLA_COPY.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 text-[#A46E28]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}