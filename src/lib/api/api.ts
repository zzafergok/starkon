// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { apiRequest } from './axios'
// import {
//   Hobby,
//   Skill,
//   Course,
//   SavedCV,
//   AuthUser,
//   CVUpload,
//   Province,
//   Education,
//   LoginData,
//   UserProfile,
//   Certificate,
//   HighSchool,
//   University,
//   CVSaveData,
//   DetailedCV,
//   RegisterData,
//   LoginResponse,
//   WorkExperience,
//   RefreshResponse,
//   ContactFormData,
//   ContactResponse,
//   RegisterResponse,
//   CVUploadResponse,
//   CVUploadsResponse,
//   ProvincesResponse,
//   DistrictsResponse,
//   DetailedCVResponse,
//   HighSchoolsResponse,
//   CoverLetterTemplate,
//   DetailedCVsResponse,
//   UniversitiesResponse,
//   CVDetailedGenerateData,
//   CoverLetterBasicResponse,
//   CoverLetterBasicsResponse,
//   CoverLetterBasicUpdateData,
//   CoverLetterDetailedResponse,
//   CoverLetterBasicGenerateData,
//   CoverLetterDetailedsResponse,
//   CoverLetterDetailedUpdateData,
//   CoverLetterDetailedGenerateData,
// } from '@/types/api.types'

// // Cover Letter API Servisleri - API dokumentasyonuna göre güncellenmiş
// export const coverLetterApi = {
//   // Basic Cover Letter servisleri
//   basic: {
//     create: (data: CoverLetterBasicGenerateData): Promise<CoverLetterBasicResponse> =>
//       apiRequest.post('/cover-letter-basic', data),

//     get: (id: string): Promise<CoverLetterBasicResponse> => apiRequest.get(`/cover-letter-basic/${id}`),

//     update: (id: string, data: CoverLetterBasicUpdateData): Promise<CoverLetterBasicResponse> =>
//       apiRequest.put(`/cover-letter-basic/${id}`, data),

//     getAll: (): Promise<CoverLetterBasicsResponse> => apiRequest.get('/cover-letter-basic'),

//     delete: (id: string): Promise<{ success: boolean; message: string }> =>
//       apiRequest.delete(`/cover-letter-basic/${id}`),

//     downloadPdf: (id: string): Promise<Blob> =>
//       apiRequest.get(`/cover-letter-basic/${id}/download/pdf`, { responseType: 'blob' }),

//     downloadCustomPdf: (data: {
//       content: string
//       positionTitle: string
//       companyName: string
//       language?: 'TURKISH' | 'ENGLISH'
//     }): Promise<Blob> => apiRequest.post('/cover-letter-basic/download/custom-pdf', data, { responseType: 'blob' }),
//   },

//   // Detailed Cover Letter servisleri
//   detailed: {
//     create: (data: CoverLetterDetailedGenerateData): Promise<CoverLetterDetailedResponse> =>
//       apiRequest.post('/cover-letter-detailed', data),

//     get: (id: string): Promise<CoverLetterDetailedResponse> => apiRequest.get(`/cover-letter-detailed/${id}`),

//     update: (id: string, data: CoverLetterDetailedUpdateData): Promise<CoverLetterDetailedResponse> =>
//       apiRequest.put(`/cover-letter-detailed/${id}`, data),

//     getAll: (): Promise<CoverLetterDetailedsResponse> => apiRequest.get('/cover-letter-detailed'),

//     delete: (id: string): Promise<{ success: boolean; message: string }> =>
//       apiRequest.delete(`/cover-letter-detailed/${id}`),

//     downloadPdf: (id: string): Promise<Blob> =>
//       apiRequest.get(`/cover-letter-detailed/${id}/download/pdf`, { responseType: 'blob' }),

//     downloadCustomPdf: (data: {
//       content: string
//       positionTitle: string
//       companyName: string
//       language?: 'TURKISH' | 'ENGLISH'
//     }): Promise<Blob> => apiRequest.post('/cover-letter-detailed/download/custom-pdf', data, { responseType: 'blob' }),
//   },
// }

// // Template Cover Letter Custom PDF
// export const templateCoverLetterApi = {
//   downloadCustomPdf: (data: {
//     content: string
//     positionTitle: string
//     companyName: string
//     templateTitle?: string
//     language?: 'TURKISH' | 'ENGLISH'
//   }): Promise<Blob> => apiRequest.post('/templates/download/custom-pdf', data, { responseType: 'blob' }),
// }

// export const authApi = {
//   // Kullanıcı kayıt
//   register: (userData: RegisterData): Promise<RegisterResponse> =>
//     apiRequest.post('/auth/register', userData, { skipAuth: true }),

//   // Kullanıcı giriş
//   login: (credentials: LoginData): Promise<LoginResponse> =>
//     apiRequest.post('/auth/login', credentials, { skipAuth: true }),

//   // Email doğrulama
//   verifyEmail: (token: string): Promise<{ success: boolean; message: string }> =>
//     apiRequest.post('/auth/verify-email', { token }, { skipAuth: true }),

//   // Email doğrulama tekrar gönder
//   resendVerification: (email: string): Promise<{ success: boolean; message: string }> =>
//     apiRequest.post('/auth/resend-verification', { email }, { skipAuth: true }),

//   // Token yenileme
//   refresh: (refreshToken: string): Promise<RefreshResponse> =>
//     apiRequest.post('/auth/refresh', { refreshToken }, { skipAuth: true }),

//   // Çıkış yap
//   logout: (): Promise<{ success: boolean; message: string }> => apiRequest.post('/auth/logout'),

//   // Tüm oturumları sonlandır
//   logoutAll: (): Promise<{ success: boolean; message: string }> => apiRequest.post('/auth/logout-all'),

//   // Şifre unuttum
//   forgotPassword: (email: string): Promise<{ success: boolean; message: string }> =>
//     apiRequest.post('/auth/forgot-password', { email }, { skipAuth: true }),

//   // Şifre sıfırla
//   resetPassword: (data: {
//     token: string
//     newPassword: string
//     confirmPassword: string
//   }): Promise<{ success: boolean; message: string }> =>
//     apiRequest.post('/auth/reset-password', data, { skipAuth: true }),

//   // Mevcut kullanıcı bilgisi
//   getCurrentUser: (): Promise<{ success: boolean; data: AuthUser }> => apiRequest.get('/auth/me'),

//   // Profil güncelle
//   updateProfile: (data: {
//     firstName: string
//     lastName: string
//   }): Promise<{ success: boolean; data: AuthUser; message?: string }> => apiRequest.put('/auth/profile', data),

//   // Şifre değiştir
//   changePassword: (data: {
//     currentPassword: string
//     newPassword: string
//     confirmPassword: string
//   }): Promise<{ success: boolean; message: string }> => apiRequest.put('/auth/change-password', data),

//   // Kullanıcı oturumları
//   getSessions: (): Promise<{ success: boolean; data: any[] }> => apiRequest.get('/auth/sessions'),
// }

// // User Profile API Servisleri
// export const userProfileApi = {
//   // Ana profil işlemleri
//   getProfile: (): Promise<{ success: boolean; data: UserProfile }> => apiRequest.get('/user-profile'),

//   updateProfile: (data: Partial<UserProfile>): Promise<{ success: boolean; data: UserProfile; message?: string }> =>
//     apiRequest.put('/user-profile', data),

//   // Eğitim işlemleri
//   education: {
//     add: (data: Omit<Education, 'id'>): Promise<{ success: boolean; data: Education; message?: string }> =>
//       apiRequest.post('/user-profile/education', data),

//     update: (
//       id: string,
//       data: Partial<Omit<Education, 'id'>>,
//     ): Promise<{ success: boolean; data: Education; message?: string }> =>
//       apiRequest.put(`/user-profile/education/${id}`, data),

//     delete: (id: string): Promise<{ success: boolean; message: string }> =>
//       apiRequest.delete(`/user-profile/education/${id}`),
//   },

//   // Deneyim işlemleri
//   experience: {
//     add: (data: Omit<WorkExperience, 'id'>): Promise<{ success: boolean; data: WorkExperience; message?: string }> =>
//       apiRequest.post('/user-profile/experience', data),

//     update: (
//       id: string,
//       data: Partial<Omit<WorkExperience, 'id'>>,
//     ): Promise<{ success: boolean; data: WorkExperience; message?: string }> =>
//       apiRequest.put(`/user-profile/experience/${id}`, data),

//     delete: (id: string): Promise<{ success: boolean; message: string }> =>
//       apiRequest.delete(`/user-profile/experience/${id}`),
//   },

//   // Kurs işlemleri
//   course: {
//     add: (data: Omit<Course, 'id'>): Promise<{ success: boolean; data: Course; message?: string }> =>
//       apiRequest.post('/user-profile/course', data),

//     update: (
//       id: string,
//       data: Partial<Omit<Course, 'id'>>,
//     ): Promise<{ success: boolean; data: Course; message?: string }> =>
//       apiRequest.put(`/user-profile/course/${id}`, data),

//     delete: (id: string): Promise<{ success: boolean; message: string }> =>
//       apiRequest.delete(`/user-profile/course/${id}`),
//   },

//   // Sertifika işlemleri
//   certificate: {
//     add: (data: Omit<Certificate, 'id'>): Promise<{ success: boolean; data: Certificate; message?: string }> =>
//       apiRequest.post('/user-profile/certificate', data),

//     update: (
//       id: string,
//       data: Partial<Omit<Certificate, 'id'>>,
//     ): Promise<{ success: boolean; data: Certificate; message?: string }> =>
//       apiRequest.put(`/user-profile/certificate/${id}`, data),

//     delete: (id: string): Promise<{ success: boolean; message: string }> =>
//       apiRequest.delete(`/user-profile/certificate/${id}`),
//   },

//   // Hobi işlemleri
//   hobby: {
//     add: (data: Omit<Hobby, 'id'>): Promise<{ success: boolean; data: Hobby; message?: string }> =>
//       apiRequest.post('/user-profile/hobby', data),

//     update: (
//       id: string,
//       data: Partial<Omit<Hobby, 'id'>>,
//     ): Promise<{ success: boolean; data: Hobby; message?: string }> =>
//       apiRequest.put(`/user-profile/hobby/${id}`, data),

//     delete: (id: string): Promise<{ success: boolean; message: string }> =>
//       apiRequest.delete(`/user-profile/hobby/${id}`),
//   },

//   // Yetenek işlemleri
//   skill: {
//     add: (data: Omit<Skill, 'id'>): Promise<{ success: boolean; data: Skill; message?: string }> =>
//       apiRequest.post('/user-profile/skill', data),

//     update: (
//       id: string,
//       data: Partial<Omit<Skill, 'id'>>,
//     ): Promise<{ success: boolean; data: Skill; message?: string }> =>
//       apiRequest.put(`/user-profile/skill/${id}`, data),

//     delete: (id: string): Promise<{ success: boolean; message: string }> =>
//       apiRequest.delete(`/user-profile/skill/${id}`),
//   },
// }

// // Contact API Servisleri - API dokumentasyonuna göre güncellenmiş
// export const contactApi = {
//   send: (data: ContactFormData): Promise<ContactResponse> => apiRequest.post('/contact/send', data, { skipAuth: true }),

//   getMessages: (): Promise<{ success: boolean; data: any[] }> => apiRequest.get('/contact/messages'),

//   checkLimit: (): Promise<{ success: boolean; data: { remainingRequests: number; resetTime: string } }> =>
//     apiRequest.get('/contact/limit', { skipAuth: true }),
// }

// // CV Upload Services - API dokumentasyonuna göre güncellenmiş
// export const cvUploadApi = {
//   // CV upload işlemleri
//   upload: (file: File): Promise<CVUploadResponse> => {
//     const formData = new FormData()
//     formData.append('cvFile', file)
//     return apiRequest.post('/cv-upload/upload', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     })
//   },

//   getUploads: (): Promise<CVUploadsResponse> => apiRequest.get('/cv-upload/uploads'),

//   getUploadStatus: (id: string): Promise<{ success: boolean; data: CVUpload }> =>
//     apiRequest.get(`/cv-upload/upload/status/${id}`),

//   deleteUpload: (id: string): Promise<{ success: boolean; message: string }> =>
//     apiRequest.delete(`/cv-upload/uploads/${id}`),
// }

// // CV Template Generation Services - Yeni CV generator servisleri
// export const cvGeneratorApi = {
//   // Mevcut template'leri al
//   getTemplates: (): Promise<{
//     success: boolean
//     data: Array<{
//       id: string
//       name: string
//       description: string
//       language: string
//     }>
//   }> => apiRequest.get('/cv-generator/templates'),

//   // Template'den CV oluştur
//   generate: (data: {
//     templateType: 'basic_hr' | 'office_manager' | 'simple_classic' | 'stylish_accounting' | 'minimalist_turkish'
//     data: {
//       personalInfo: {
//         fullName: string
//         address?: string
//         city?: string
//         state?: string
//         zipCode?: string
//         phone?: string
//         email: string
//       }
//       objective?: string
//       experience?: Array<{
//         jobTitle: string
//         company: string
//         location?: string
//         startDate: string
//         endDate?: string
//         description?: string
//       }>
//       education?: Array<{
//         degree: string
//         university: string
//         location?: string
//         graduationDate?: string
//         details?: string
//       }>
//       communication?: string
//       leadership?: string
//       references?: Array<{
//         name: string
//         company: string
//         contact: string
//       }>
//     }
//   }): Promise<{
//     success: boolean
//     message: string
//     data: {
//       id: string
//       templateType: string
//       generationStatus: 'COMPLETED' | 'PENDING' | 'PROCESSING' | 'FAILED'
//       createdAt: string
//       updatedAt: string
//     }
//   }> => apiRequest.post('/cv-generator/generate', data),

//   // Kullanıcının oluşturduğu CV'leri al
//   getGeneratedCVs: (): Promise<{
//     success: boolean
//     data: Array<{
//       id: string
//       templateType: string
//       generationStatus: 'COMPLETED' | 'PENDING' | 'PROCESSING' | 'FAILED'
//       createdAt: string
//       updatedAt: string
//     }>
//     limitInfo: {
//       current: number
//       maximum: number
//       canCreate: boolean
//       type: string
//     }
//   }> => apiRequest.get('/cv-generator'),

//   // Belirli bir CV'yi al
//   getGeneratedCV: (
//     cvId: string,
//   ): Promise<{
//     success: boolean
//     data: {
//       id: string
//       templateType: string
//       generationStatus: 'COMPLETED' | 'PENDING' | 'PROCESSING' | 'FAILED'
//       createdAt: string
//       updatedAt: string
//     }
//   }> => apiRequest.get(`/cv-generator/${cvId}`),

//   // CV'yi PDF olarak indir
//   downloadPdf: (cvId: string): Promise<Blob> =>
//     apiRequest.get(`/cv-generator/${cvId}/download`, { responseType: 'blob' }),

//   // CV'yi yeniden oluştur
//   regenerate: (
//     cvId: string,
//   ): Promise<{
//     success: boolean
//     message: string
//     data: {
//       id: string
//       templateType: string
//       generationStatus: 'COMPLETED' | 'PENDING' | 'PROCESSING' | 'FAILED'
//       createdAt: string
//       updatedAt: string
//     }
//   }> => apiRequest.post(`/cv-generator/${cvId}/regenerate`),

//   // CV'yi sil
//   delete: (cvId: string): Promise<{ success: boolean; message: string }> => apiRequest.delete(`/cv-generator/${cvId}`),
// }

// // Legacy CV API - Geriye dönük uyumluluk için
// export const cvApi = {
//   // CV upload işlemleri - cvUploadApi'ye yönlendir
//   upload: cvUploadApi.upload,
//   getUploads: cvUploadApi.getUploads,
//   getUploadStatus: cvUploadApi.getUploadStatus,
//   deleteUpload: cvUploadApi.deleteUpload,

//   // CV generation işlemleri - cvGeneratorApi'ye yönlendir
//   generate: cvGeneratorApi.generate,
//   download: cvGeneratorApi.downloadPdf,

//   // Eski CV save işlemleri - şimdilik korunuyor
//   save: (data: CVSaveData): Promise<{ success: boolean; data: SavedCV; message?: string }> =>
//     apiRequest.post('/cv/save', data),

//   // Eski Detailed CV işlemleri - şimdilik korunuyor
//   generateDetailed: (data: CVDetailedGenerateData): Promise<{ success: boolean; data: DetailedCV; message?: string }> =>
//     apiRequest.post('/cv/generate-detailed', data),

//   getDetailed: (): Promise<DetailedCVsResponse> => apiRequest.get('/cv/detailed'),

//   getDetailedById: (id: string): Promise<DetailedCVResponse> => apiRequest.get(`/cv/detailed/${id}`),

//   deleteDetailed: (id: string): Promise<{ success: boolean; message: string }> =>
//     apiRequest.delete(`/cv/detailed/${id}`),

//   downloadDetailedPdf: (id: string): Promise<Blob> =>
//     apiRequest.get(`/cv/detailed/${id}/download/pdf`, { responseType: 'blob' }),
// }

// // Location API Servisleri - Güncel API format
// export const locationApi = {
//   // İl servisleri
//   getProvinces: (): Promise<ProvincesResponse> => apiRequest.get('/locations/provinces', { skipAuth: true }),

//   // İl arama
//   searchProvinces: (query: string): Promise<ProvincesResponse> =>
//     apiRequest.get(`/locations/provinces/search?q=${encodeURIComponent(query)}`, { skipAuth: true }),

//   // İl kodu ile il
//   getProvinceByCode: (code: string): Promise<{ success: boolean; data: Province }> =>
//     apiRequest.get(`/locations/provinces/code/${code}`, { skipAuth: true }),

//   // İl ismi ile il
//   getProvinceByName: (name: string): Promise<{ success: boolean; data: Province }> =>
//     apiRequest.get(`/locations/provinces/name/${encodeURIComponent(name)}`, { skipAuth: true }),

//   // İl koduna göre ilçeler
//   getDistrictsByProvinceCode: (code: string): Promise<DistrictsResponse> =>
//     apiRequest.get(`/locations/districts/province-code/${code}`, { skipAuth: true }),

//   // İl ismine göre ilçeler
//   getDistrictsByProvinceName: (name: string): Promise<DistrictsResponse> =>
//     apiRequest.get(`/locations/districts/province-name/${encodeURIComponent(name)}`, { skipAuth: true }),

//   // İlçe arama
//   searchDistricts: (query: string, provinceCode?: string): Promise<DistrictsResponse> => {
//     const url = new URL('/locations/districts/search', 'https://api.example.com')
//     url.searchParams.append('q', query)
//     if (provinceCode) url.searchParams.append('provinceCode', provinceCode)
//     return apiRequest.get(url.pathname + url.search, { skipAuth: true })
//   },

//   // Lokasyon istatistikleri
//   getStats: (): Promise<{
//     success: boolean
//     data: { totalProvinces: number; totalDistricts: number; isLoaded: boolean }
//   }> => apiRequest.get('/locations/stats', { skipAuth: true }),
// }

// // School API Servisleri - Güncel API format
// export const schoolApi = {
//   // Lise servisleri
//   getAllHighSchools: (): Promise<HighSchoolsResponse> => apiRequest.get('/high-schools', { skipAuth: true }),

//   // Lise arama
//   searchHighSchools: (query: string): Promise<HighSchoolsResponse> =>
//     apiRequest.get(`/high-schools/search?q=${encodeURIComponent(query)}`, { skipAuth: true }),

//   // Şehre göre liseler
//   getHighSchoolsByCity: (city: string): Promise<HighSchoolsResponse> =>
//     apiRequest.get(`/high-schools/city/${encodeURIComponent(city)}`, { skipAuth: true }),

//   // Lise detayı
//   getHighSchoolById: (id: string): Promise<{ success: boolean; data: HighSchool }> =>
//     apiRequest.get(`/high-schools/${id}`, { skipAuth: true }),

//   // Lise istatistikleri
//   getHighSchoolStats: (): Promise<{ success: boolean; data: { total: number; cities: number; isLoaded: boolean } }> =>
//     apiRequest.get('/high-schools/stats', { skipAuth: true }),

//   // Lise verilerini yenile
//   reloadHighSchools: (): Promise<{ success: boolean; message: string }> =>
//     apiRequest.post('/high-schools/reload', {}, { skipAuth: true }),

//   // Üniversite servisleri
//   getAllUniversities: (): Promise<UniversitiesResponse> => apiRequest.get('/universities', { skipAuth: true }),

//   // Üniversite arama
//   searchUniversities: (query: string): Promise<UniversitiesResponse> =>
//     apiRequest.get(`/universities/search?q=${encodeURIComponent(query)}`, { skipAuth: true }),

//   // Şehre göre üniversiteler
//   getUniversitiesByCity: (city: string): Promise<UniversitiesResponse> =>
//     apiRequest.get(`/universities/city/${encodeURIComponent(city)}`, { skipAuth: true }),

//   // Türe göre üniversiteler
//   getUniversitiesByType: (type: 'STATE' | 'FOUNDATION' | 'PRIVATE'): Promise<UniversitiesResponse> =>
//     apiRequest.get(`/universities/type/${type}`, { skipAuth: true }),

//   // Üniversite detayı
//   getUniversityById: (id: string): Promise<{ success: boolean; data: University }> =>
//     apiRequest.get(`/universities/${id}`, { skipAuth: true }),

//   // Üniversite istatistikleri
//   getUniversityStats: (): Promise<{
//     success: boolean
//     data: {
//       total: number
//       state: number
//       foundation: number
//       private: number
//       cities: number
//       isLoaded: boolean
//       lastUpdated: string
//     }
//   }> => apiRequest.get('/universities/stats', { skipAuth: true }),

//   // Üniversite verilerini yenile
//   refreshUniversities: (): Promise<{ success: boolean; message: string }> =>
//     apiRequest.post('/universities/refresh', {}, { skipAuth: true }),
// }

// // Template API Servisleri - API dokumentasyonuna göre güncellenmiş
// export const templateApi = {
//   // Tüm template'leri al (filtreleme seçenekleri ile)
//   getAll: (params?: {
//     industry?: 'TECHNOLOGY' | 'FINANCE' | 'HEALTHCARE' | 'EDUCATION' | 'MARKETING'
//     category?: string
//     language?: 'TURKISH' | 'ENGLISH'
//   }): Promise<{ success: boolean; data: CoverLetterTemplate[]; message?: string }> => {
//     const queryParams = new URLSearchParams()
//     if (params?.industry) queryParams.append('industry', params.industry)
//     if (params?.category) queryParams.append('category', params.category)
//     if (params?.language) queryParams.append('language', params.language)

//     const queryString = queryParams.toString()
//     return apiRequest.get(`/templates${queryString ? `?${queryString}` : ''}`)
//   },

//   // Template kategorilerini al
//   getCategories: (): Promise<{ success: boolean; data: Record<string, string[]>; message?: string }> =>
//     apiRequest.get('/templates/categories'),

//   // Sektöre göre template'leri al
//   getByIndustry: (
//     industry: 'TECHNOLOGY' | 'FINANCE' | 'HEALTHCARE' | 'EDUCATION' | 'MARKETING',
//   ): Promise<{ success: boolean; data: CoverLetterTemplate[]; message?: string }> =>
//     apiRequest.get(`/templates/industry/${industry}`),

//   // ID'ye göre template al
//   getById: (templateId: string): Promise<{ success: boolean; data: CoverLetterTemplate; message?: string }> =>
//     apiRequest.get(`/templates/${templateId}`),

//   // Template'den cover letter oluştur
//   createCoverLetter: (data: {
//     templateId: string
//     positionTitle: string
//     companyName: string
//     personalizations: {
//       whyPosition?: string
//       whyCompany?: string
//       additionalSkills?: string
//     }
//   }): Promise<{
//     success: boolean
//     data: { content: string; templateId: string; positionTitle: string; companyName: string }
//     message?: string
//   }> => apiRequest.post('/templates/create-cover-letter', data),

//   // Template'leri başlat (Admin)
//   initialize: (): Promise<{ success: boolean; message: string }> => apiRequest.post('/templates/initialize'),
// }
