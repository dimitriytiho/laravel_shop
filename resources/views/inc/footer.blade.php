<footer class="container-fluid footer a-light">
    <div class="container">
        <div class="row align-items-center pt-2">
            <div class="col-xl-3 col-sm-6 order-1 order-xl-0 text-center text-xl-left pt-3 pt-sm-4">
                <a href="{{ route('index') }}">
                    <picture>
                        <source srcset="{{ asset("{$img}/logo/logotype_white.svg") }}">
                        <img src="{{ asset("{$img}/logo/logotype_white.png") }}" class="header_top__logo--img" alt="{{ Main::site('name') }}">
                    </picture>
                </a>
                <p class="mt-3 no-wrap">{{ Main::site('description') }}</p>
            </div>

            <div class="col-xl-6 mb-2 mb-xl-0 font-weight-bold pt-2 pt-sm-4">
                @include('menu.footer')
            </div>

            <div class="col-xl-3 col-sm-6 order-1 order-xl-0 text-center text-xl-right pt-4">
                <a href="tel:+{{ onlyPhoneNumber(Main::site('tel')) }}" itemprop="telephone" content="+{{ onlyPhoneNumber(Main::site('tel')) }}" class="h5 d-block my-2">{{ Main::site('tel') }}</a>
                <a href="mailto:{{ Main::site('email') }}">{{ Main::site('email') }}</a>
            </div>
        </div>
        <div class="row">
            <div class="col font-weight-light text-center mt-3 py-2">
                <small>&copy;&nbsp;{{ date('Y') }}&nbsp;{{ Main::site('name') }} | <a href="//omegakontur.ru" target="_blank">Создано {{ config('add.dev') }}</a></small>
            </div>
        </div>
    </div>
</footer>
