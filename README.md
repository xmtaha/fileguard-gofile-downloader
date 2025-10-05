# FileGuard & Gofile Otomatik İndirici

## Açıklama
Bu Tampermonkey scripti, `fileguard.cc` ve `gofile.io` sitelerinden dosya bulma ve indirme işlemlerini otomatikleştirir. İş akışını şu şekilde kolaylaştırır:

1. `fileguard.cc` sayfalarındaki Gofile linklerini algılar.
2. Seçim ve indirme işlemleri için kullanıcı dostu bir arayüz sunar.
3. `gofile.io` sayfalarında indirme işlemini otomatik olarak başlatır.

## Özellikler
- **Gofile Link Algılama**: `fileguard.cc` sayfalarını otomatik olarak tarar ve Gofile linklerini bulur.
- **Kullanıcı Arayüzü**: Dosyaları seçmek ve indirmek için basit bir arayüz sağlar.
- **Toplu İndirme**: Seçilen linkleri yeni sekmelerde açar ve sırayla indirme işlemini başlatır.
- **Otomatik Kapatma**: İndirme başladıktan kısa bir süre sonra `gofile.io` sekmesini kapatır.

## Kurulum
1. Tarayıcınıza [Tampermonkey eklentisini](https://www.tampermonkey.net/) yükleyin.
2. `tampermonkey/fileguard-gofile-combined.user.js` dosyasındaki kodu kopyalayın.
3. Yeni bir Tampermonkey scripti oluşturun ve kodu yapıştırın.
4. Scripti kaydedin.

## Kullanım
1. Gofile linkleri içeren bir `fileguard.cc` sayfasına gidin.
2. Script, algılanan linklerle birlikte bir arayüz gösterecektir.
3. İndirmek istediğiniz dosyaları seçin ve **SEÇİLENLERİ İNDİR** butonuna tıklayın.
4. Script, linkleri yeni sekmelerde açacak ve indirme işlemini başlatacaktır.
5. `gofile.io` üzerinde script, indirme butonuna otomatik olarak tıklar ve kısa bir süre sonra sekmeyi kapatır.

## Notlar
- Scriptin düzgün çalışması için tarayıcınızda pop-up engelleyicisinin kapalı olduğundan emin olun.
- Script kişisel kullanım için tasarlanmıştır ve web siteleri yapısını değiştirirse çalışmayabilir.

## Yazar
Geliştirici: xmtaha.