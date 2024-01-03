#include <ESP8266WiFi.h>
#include <MFRC522.h>
#include "ThingSpeak.h"
#include "secrets.h"

#define led 15
#define mic 3
#define micanaloge A0
#define buildinLED 2
#define SS_PIN 4   // Define the SS (Slave Select) pin
#define RST_PIN 5  // Define the RST pin

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create an MFRC522 instance

char ssid[] = SECRET_SSID;  // your network SSID (name)
char pass[] = SECRET_PASS;  // your network password
int keyIndex = 0;           // your network key Index number (needed only for WEP)
WiFiClient client;

unsigned long myChannelNumber = SECRET_CH_ID;
const char *myWriteAPIKey = SECRET_WRITE_APIKEY;
bool micLogic = 1;

void setup() {
  Serial.begin(115200);  // Initialize serial
  while (!Serial) {
    ;  // wait for the serial port to connect. Needed for Leonardo native USB port only
  }
  pinMode(mic, INPUT);
  pinMode(micanaloge, INPUT);
  pinMode(led, OUTPUT);
  pinMode(buildinLED, OUTPUT);
  digitalWrite(buildinLED, HIGH);

  WiFi.mode(WIFI_STA);
  ThingSpeak.begin(client);  // Initialize ThingSpeak
  SPI.begin();               // Initiate SPI bus
  mfrc522.PCD_Init();        // Initiate MFRC522
  Serial.println("RFID-RC522 Ready to read.");
  digitalWrite(led, HIGH);
}
void loop() {
  // Connect or reconnect to WiFi
  // int micValue = analogRead(micanaloge);
  // Serial.println(micValue);

  digitalWrite(led, HIGH);
  if (WiFi.status() != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    digitalWrite(buildinLED, HIGH);
    Serial.println(SECRET_SSID);
    while (WiFi.status() != WL_CONNECTED) {
      WiFi.begin(ssid, pass);  // Connect to WPA/WPA2 network. Change this line if using an open or WEP network
      Serial.print(".");
      delay(4000);
      digitalWrite(buildinLED, LOW);
      delay(800);
      digitalWrite(buildinLED, HIGH);
    }
    digitalWrite(buildinLED, LOW);
    Serial.println("\nConnected.");
  }
  // Look for new cards
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    // Concatenate UID bytes into an unsigned int
    digitalWrite(led, LOW);
    unsigned int uidValue = 0;
    for (byte i = 0; i < mfrc522.uid.size; i++) {
      uidValue = (uidValue << 8) | mfrc522.uid.uidByte[i];
    }

    // Show UID on the serial monitor
    Serial.print("UID Tag: ");
    for (byte i = 0; i < mfrc522.uid.size; i++) {
      Serial.print(mfrc522.uid.uidByte[i], DEC);
    }
    Serial.println();

    // Print UID value as an unsigned int
    Serial.print("UID Value: ");
    Serial.println(uidValue);

    // Convert UID to String and write to ThingSpeak
    String uidString = String(uidValue);
    int x = ThingSpeak.writeField(myChannelNumber, 1, uidString, myWriteAPIKey);
    state(x, 1);
    // delay(10000);  // Delay to avoid reading the same card multiple times
  }
  if (digitalRead(mic) && micLogic) {
    digitalWrite(led, LOW);
    int x = ThingSpeak.writeField(myChannelNumber, 2, 1, myWriteAPIKey);
    state(x, 2);
    micLogic = false;
    // delay(10000);

  } else if (!digitalRead(mic) && !micLogic) {
    digitalWrite(led, LOW);
    int x = ThingSpeak.writeField(myChannelNumber, 2, 0, myWriteAPIKey);
    state(x, 2);
    micLogic = true;
    delay(1000);
  }
  // delay(1);
}
void state(int x, int c) {
  if (x == 200) {
    Serial.println("Update successful. Channel " + String(c));
    digitalWrite(led, HIGH);
    delay(100);
    digitalWrite(led, LOW);
    delay(80);
    digitalWrite(led, HIGH);
    delay(100);
    digitalWrite(led, LOW);
    delay(16000);
  } else {
    Serial.println("Problem updating channel. HTTP error code " + String(x));
    delay(10000);
  }
}
