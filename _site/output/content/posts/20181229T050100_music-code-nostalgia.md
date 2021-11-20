# A Day of Music, Code &#038; Nostalgia
~ 2018-12-29T05:01:00+00:00 ~

---
I decided to start playing around with electronics a bit more as I feel really rusty, and what better way than to pull out my Arduino kit and start hacking some projects together. So today I went about in a hacker mood.

I decided I wanted to play around with a few concepts so I first looked at what I had available at the moment and it was the following:

1. 4×4 Matrix Keypad
2. RFID Reader (13Mhz)
3. Buzzer Speaker
4. LCD Screen (16×2)
5. Bluetooth SPI Module

My first experiment was to just connect up the different pieces and see what sort of weird contraption I came up with. My Idea ended up being a simple keypad, speaker which allowed me to set a password(over serial) which could be entered via the keypad and validated.

For fun, I decided I was going to incorporate the victory theme from Final Fantasy VII as it always comes to mind when I have a successful moment.

![](../../uploads/2018/12/IMG_20181216_134700-1024x768.jpg)Afterwards, I decided I wanted to expand a little so I decided I was going to incorporate some work with Android as well and build a small Bluetooth connector and an app to send data between my Arduino and my phone.

I found a nice starting point with [Mayoogh’s](https://github.com/Mayoogh/Arduino-Bluetooth-Basic) awesome tutorial whereby I was able to see how to connect to Bluetooth for a simple LED controller. I decided this was great so I modified the code and made a new project for a bluetooth controlled Keyboard (Piano).

This was my result:

Below you can see the piano in action. (Warning: you will have to turn the volume WAY UP to hear it).

If you want to see the source code for the app and the arduino sketch you can find it below:

https://github.com/ConflictingTheories/arduinoBTKeyboard/

Additionally, I have included a Fritzing for your convenience on the sketch portion (I have omitted the keypad + RFID portions for now – I may add them later to the Fritz):

![](../../uploads/2018/12/BTKeyboard_bb-1018x1024.png)