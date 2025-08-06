# Mock Users - Development Only

Bu dosya sadece development ortamında kullanılan mock kullanıcı bilgilerini içerir.

## Kullanılabilir Mock Kullanıcılar:

### Admin User

- **Email:** admin@example.com
- **Password:** admin123
- **Role:** admin

### Regular User

- **Email:** user@example.com
- **Password:** user123
- **Role:** user

### Demo User

- **Email:** demo@example.com
- **Password:** demo123
- **Role:** demo

## Kullanım

Login sayfasında yukarıdaki herhangi bir email/password kombinasyonunu kullanarak giriş yapabilirsiniz.

## Temizleme

Production'a geçerken aşağıdaki dosyaları silebilirsiniz:

- `src/lib/services/mockAuthService.ts`
- `MOCK_USERS.md` (bu dosya)
- `src/lib/services/authApiService.ts` dosyasındaki mock import ve logic'i

Mock sistemini tamamen kaldırmak için `authApiService.ts` dosyasında:

1. `MockAuthService` import'unu kaldırın
2. `USE_MOCK_DATA` kontrollerini ve mock logic'lerini silin
3. Sadece gerçek API çağrılarını bırakın
