import subscribeImage from '../assets/subscribe.svg';
import bookAdImage from '../assets/book-ad.png';
import { XIcon } from '@heroicons/react/outline'
import { MajarraButton } from './button';

export function AdsCanvas() {

    return (
        <BookAd />
    );
}
export function BookAd() {

    return (
        <div>

            <div className="py-12 border-1 border-slate-200">


                <div className="relative flex flex-col items-center rounded max-w-[max-content] mx-auto bg-[#e8e9ea33]">


                    <div className="absolute top-[-34px] left-5 hover:cursor-pointer">

                        <p className="px-2 py-1 font-bold flex items-center bg-[#F6EBFF] text-[#5A13A0] rounded">
                            {'إغلاق'}

                            <XIcon
                                className="h-5 w-5 mx-1 cursor-pointer dark:stroke-white"
                            />
                        </p>
                    </div>


                    <a
                        href="https://google.com"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <img
                            src={bookAdImage}
                            alt="book-ad"
                        />
                    </a>

                </div>

            </div>

        </div>
    );
}




export function SubscribeAd({ closeHandler }: { closeHandler: () => void }) {

    return (
        <div>

            <div className="py-12 border-1 border-slate-200">


                <div className="relative flex flex-col items-center px-5 py-7 border-2 border-[#E8E9EA] rounded max-w-[299px] mx-auto bg-[#fafafa]">


                    <div
                        className="absolute top-[-34px] left-5 hover:cursor-pointer">

                        <p
                            onClick={closeHandler}
                            className="px-2 py-1 font-bold flex items-center bg-[#F6EBFF] text-[#5A13A0] rounded">
                            {'إغلاق'}

                            <XIcon
                                className="h-5 w-5 mx-1 cursor-pointer dark:stroke-white"
                            />
                        </p>
                    </div>


                    <a
                        href="https://my.majarra.com/pricing"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <img
                            src={subscribeImage}
                            alt="subscribe"
                            className="w-[200px]"
                        />
                    </a>

                    <p
                        className="my-4 text-center"
                    >
                        {'اشترك في دقيقة واحدة فقط في مجرة, أنت الآن تقف على أعتاب أفضل محتوى عربي ستجده أبدآ على الإنترنت'}
                    </p>


                    <a
                        href="https://my.majarra.com/pricing"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="w-[100%]"
                    >
                        <MajarraButton
                            variant="contained"
                            fullWidth
                            className="h-[40px]"
                        >
                            {'أكتشف باقات الاشتراك'}
                        </MajarraButton>
                    </a>

                </div>

            </div>

        </div>
    );
}
