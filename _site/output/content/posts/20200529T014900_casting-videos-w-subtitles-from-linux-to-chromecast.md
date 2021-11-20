# Casting Videos w/ Subtitles from Linux to Chromecast
~ 2020-05-29T01:49:00+00:00 ~
  
---
I was surprised to learn recently that VLC seems to have some trouble with external SRT subtitles when you attempt to cast to a Chromecast device. It already kind of sucks with some video formats (more below) but this was a new annoyance I hadn’t come across.

The subtitles were working within the VLC window itself, but as soon as I attempted to cast it to my Chromecast, it sent the video without any subtitles.

I looked online and a bunch of paid services were being promoted that claimed to offer this feature, but none seemed to provide it for free, and VLC didn’t seem to have any options – and to top it all off – none of the paid versions are linux friendly.

I found a solution which is a **dream** and I highly recommend it above ALL ELSE when it comes to streaming to Chromecast from linux. Please save your money, save your stress, and watch that beautiful foreign film in all its subtitled glory!

Castnow – Open Source Goodness
------------------------------

I would like to thank *[xat](https://github.com/xat)* and the rest of the contributors who have helped make **[castnow](https://github.com/xat/castnow)**. It is fantastic and works better than any other solution I have found.

IT JUST WORKS….with command line arguments present and known.

Examples:

**MKV Files:**

 ~~~
castnow --tomp4 --ffmpeg-ac 2 --address <Chromecast-IP> --subtitles <path-to-subtitles>.srt <path-to-video>.mkv
 ~~~

**MP4 Files:**

 ~~~
castnow --ffmpeg-ac 2 --address <Chromecast-IP> --subtitles <path-to-subtitles>.srt <path-to-video>.mp4
 ~~~

**Without Subtitle File:**

 ~~~
castnow --tomp4 --ffmpeg-ac 2 --address <Chromecast-IP><path-to-video>.mkv
 ~~~

I hope this helps some people to fix this issue without trying to shell out for paid solutions which don’t even work. Take care!