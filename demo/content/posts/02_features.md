## Features Coming Soon

The following are the features I am working on getting ready:

- ✔️ Mobile Support 📱
- ✔️ Resizable Images 🖼️
- ✔️ Support for Inline HTML 🌐
- ✔️ Better Configuration & Instructions :gear:
- :construction: Admin Section & Application

More Complex Features (Will come later)

- :construction: Plugins Like galleries and Custom Embeds 🔌
- :construction: Deployment to Git / S3 / Others
- :construction: Injectable Posts / Nested Content via Reference
- :construction: Reloadable Live-Preview
- :construction: Live Editting
- :construction: Publish / Edit Buttons
- :construction: Permissions & Roles

<hr/>
    
<link
  href="https://fonts.googleapis.com/css?family=Rock+Salt"
  rel="stylesheet"
  type="text/css"
/>

<link
  href="https://fonts.googleapis.com/css?family=Syncopate"
  rel="stylesheet"
  type="text/css"
/>
    
<style>
  body{
            font-family: "Syncopate", sans-serif;

  }
      .conflict {
        font-family: "Rock Salt", sans-serif;
        font-style: italic;
        white-space: nowrap;
      }

      .glitch {
        color: #dfbfbf;
        position: relative;
        font-size: 7vw;
        animation: glitch 5s 5s infinite;
      }

      .glitch::before
     {
        content: attr(data-text);
        position: absolute;
        left: -2px;
        text-shadow: -5px 0 magenta;
        /* background: black; */
        overflow: hidden;
        top: 0;
        animation: noise-1 3s linear infinite alternate-reverse,
          glitch 5s 5.05s infinite;
      }

      .glitch::after
      {
        content: attr(data-text);
        position: absolute;
        left: 2px;
        text-shadow: -5px 0 lightgreen;
        /* background: black; */
        overflow: hidden;
        top: 0;
        animation: noise-2 3s linear infinite alternate-reverse,
          glitch 5s 5s infinite;
      }

      @keyframes glitch {
        1% {
          transform: rotateX(10deg) skewX(90deg);
        }
        2% {
          transform: rotateX(0deg) skewX(0deg);
        }
      }
      @keyframes noise-1 {
        3.3333333333% {
          clip-path: inset(17px 0 48px 0);
        }
        6.6666666667% {
          clip-path: inset(15px 0 8px 0);
        }
        10% {
          clip-path: inset(69px 0 7px 0);
        }
        13.3333333333% {
          clip-path: inset(93px 0 7px 0);
        }
        16.6666666667% {
          clip-path: inset(6px 0 22px 0);
        }
        20% {
          clip-path: inset(71px 0 18px 0);
        }
        23.3333333333% {
          clip-path: inset(9px 0 26px 0);
        }
        26.6666666667% {
          clip-path: inset(83px 0 9px 0);
        }
        30% {
          clip-path: inset(99px 0 1px 0);
        }
        33.3333333333% {
          clip-path: inset(16px 0 71px 0);
        }
        36.6666666667% {
          clip-path: inset(80px 0 4px 0);
        }
        40% {
          clip-path: inset(25px 0 3px 0);
        }
        43.3333333333% {
          clip-path: inset(94px 0 7px 0);
        }
        46.6666666667% {
          clip-path: inset(6px 0 73px 0);
        }
        50% {
          clip-path: inset(71px 0 16px 0);
        }
        53.3333333333% {
          clip-path: inset(38px 0 61px 0);
        }
        56.6666666667% {
          clip-path: inset(85px 0 8px 0);
        }
        60% {
          clip-path: inset(13px 0 20px 0);
        }
        63.3333333333% {
          clip-path: inset(39px 0 53px 0);
        }
        66.6666666667% {
          clip-path: inset(14px 0 37px 0);
        }
        70% {
          clip-path: inset(59px 0 9px 0);
        }
        73.3333333333% {
          clip-path: inset(86px 0 5px 0);
        }
        76.6666666667% {
          clip-path: inset(97px 0 3px 0);
        }
        80% {
          clip-path: inset(57px 0 28px 0);
        }
        83.3333333333% {
          clip-path: inset(49px 0 24px 0);
        }
        86.6666666667% {
          clip-path: inset(45px 0 18px 0);
        }
        90% {
          clip-path: inset(87px 0 13px 0);
        }
        93.3333333333% {
          clip-path: inset(10px 0 31px 0);
        }
        96.6666666667% {
          clip-path: inset(7px 0 25px 0);
        }
        100% {
          clip-path: inset(31px 0 63px 0);
        }
      }
      @keyframes noise-2 {
        0% {
          clip-path: inset(34px 0 18px 0);
        }
        3.3333333333% {
          clip-path: inset(76px 0 20px 0);
        }
        6.6666666667% {
          clip-path: inset(70px 0 22px 0);
        }
        10% {
          clip-path: inset(94px 0 1px 0);
        }
        13.3333333333% {
          clip-path: inset(18px 0 72px 0);
        }
        16.6666666667% {
          clip-path: inset(28px 0 59px 0);
        }
        20% {
          clip-path: inset(59px 0 33px 0);
        }
        23.3333333333% {
          clip-path: inset(13px 0 47px 0);
        }
        26.6666666667% {
          clip-path: inset(41px 0 25px 0);
        }
        30% {
          clip-path: inset(22px 0 12px 0);
        }
        33.3333333333% {
          clip-path: inset(15px 0 61px 0);
        }
        36.6666666667% {
          clip-path: inset(39px 0 4px 0);
        }
        40% {
          clip-path: inset(88px 0 8px 0);
        }
        43.3333333333% {
          clip-path: inset(6px 0 76px 0);
        }
        46.6666666667% {
          clip-path: inset(23px 0 50px 0);
        }
        50% {
          clip-path: inset(92px 0 2px 0);
        }
        53.3333333333% {
          clip-path: inset(24px 0 22px 0);
        }
        56.6666666667% {
          clip-path: inset(98px 0 2px 0);
        }
        60% {
          clip-path: inset(12px 0 63px 0);
        }
        63.3333333333% {
          clip-path: inset(70px 0 10px 0);
        }
        66.6666666667% {
          clip-path: inset(100px 0 1px 0);
        }
        70% {
          clip-path: inset(22px 0 70px 0);
        }
        73.3333333333% {
          clip-path: inset(70px 0 24px 0);
        }
        76.6666666667% {
          clip-path: inset(71px 0 9px 0);
        }
        80% {
          clip-path: inset(2px 0 76px 0);
        }
        83.3333333333% {
          clip-path: inset(23px 0 33px 0);
        }
        86.6666666667% {
          clip-path: inset(59px 0 4px 0);
        }
        90% {
          clip-path: inset(42px 0 22px 0);
        }
        93.3333333333% {
          clip-path: inset(49px 0 46px 0);
        }
        96.6666666667% {
          clip-path: inset(42px 0 29px 0);
        }
        100% {
          clip-path: inset(77px 0 18px 0);
        }
      }
      @keyframes fudge {
        from {
          transform: translate(0px, 0px);
        }
        to {
          transform: translate(0px, 2%);
        }
      }
      @keyframes glitch-2 {
        1% {
          transform: rotateX(10deg) skewX(70deg);
        }
        2% {
          transform: rotateX(0deg) skewX(0deg);
        }
      }
    </style>

<div>
    <span class="glitch conflict">inline</span>&nbsp; &nbsp; &nbsp; &nbsp;<span class="glitch" data-text="HTML"  >HTML</span>
    <p><strong>This Text</strong> is rendered using inline html and there is injected CSS for easy customization. (Note - this may be limited in the future for security)</p>
    <h3>💪 Give it TRY!  </h3>
</div>

<hr/>

:+1: :+1: :+1: :+1: :v: [4 / 5 thumbs agree]
