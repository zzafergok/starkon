export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0], // Büyük/küçük harf zorunluluğunu kaldır
    'subject-full-stop': [0, 'never'], // Nokta ile bitmesine izin ver
    'header-max-length': [0, 'always', 150], // Başlık uzunluğunu artır
    'body-max-line-length': [0, 'always', 200], // Gövde satır uzunluğunu artır
  },
}
