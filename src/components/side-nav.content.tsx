import { MajarraButton } from './button';

import majarraLogo from '../assets/majarra-logo.png';
import hbrLogo from '../assets/hbr-logo.png';
import mitLogo from '../assets/mit-logo.png';
import standfordLogo from '../assets/standford-logo.png';
import nafsLogo from '../assets/nafs-logo.png';
import popsciLogo from '../assets/popsci-logo.png';
import closeIcon from '../assets/close.svg';


export function SideNavContent({ closeHandler }: { closeHandler: () => void }) {

    return (
        <div
            className="block w-[300px] h-full bg-[#fff] px-1 py-10 overflow-y-auto"
        >


            <div className="px-5 py-6">
                <img
                    src={closeIcon}
                    alt="close"
                    className="mb-4 hover:cursor-pointer"
                    onClick={closeHandler}
                />

                <a
                    href="https://my.majarra.com/"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <img
                        src={majarraLogo}
                        alt="majarra"
                        className="mb-10"
                    />
                </a>

                <p
                    className="text-2xl font-bold"
                >
                    {'منصات مجرة'}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-10 justify-items-center">
                <a
                    href="https://hbrarabic.com/"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <img
                        src={hbrLogo}
                        alt="majarra"
                    />
                </a>

                <a
                    href="https://technologyreview.ae/"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <img
                        src={mitLogo}
                        alt="majarra"
                    />
                </a>


                <a
                    href="https://nafseyati.com/"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <img
                        src={nafsLogo}
                        alt="majarra"
                    />
                </a>

                <a
                    href="https://popsciarabia.com/"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <img
                        src={popsciLogo}
                        alt="majarra"
                    />
                </a>


                <a
                    href="https://ssirarabia.com/"
                    rel="noreferrer noopener"
                    target="_blank"
                    className="col-span-2"
                >
                    <img
                        src={standfordLogo}
                        alt="majarra"
                    />
                </a>
            </div>

            <div className="flex flex-col px-5 py-10">
                <a
                    href="https://my.majarra.com/"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <MajarraButton variant="outlined" fullWidth>
                        {'نظرة أعمق إلى محتوى مجرة'}
                    </MajarraButton>
                </a>
                <br />
                <a
                    href="https://my.majarra.com/pricing"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <MajarraButton variant="contained" fullWidth>
                        {'باقات الإشتراك'}
                    </MajarraButton>
                </a>
            </div>
        </div>
    );
}
