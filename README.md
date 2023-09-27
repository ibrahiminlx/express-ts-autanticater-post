# Proje Açıklaması

Bu proje, kullanıcıların ve kullanıcı rollerinin bulunduğu bir sistem içermektedir. Projenin rolleri arasında "admin," "read," "write," ve "readandwrite" gibi çeşitli yetkilendirmeler bulunmaktadır. Sadece "admin" rolü, kullanıcı oluşturma, silme, düzenleme gibi işlemleri gerçekleştirebilirken, diğer roller sadece okuma, yazma veya hem okuma hem yazma yetkilerine sahiptirler. Ayrıca, kullanıcılar sadece kendi gönderilerini oluşturabilir ve düzenleyebilirler.

## Kimlik Doğrulama

Kimlik doğrulama işlemleri JSON Web Token (JWT) kullanılarak gerçekleştirilir. Bu tokenlar içinde "login," "generatetoken" ve "logout" olmak üzere üç ana alan bulunur. İşlemler, erişim (access) token ile gerçekleştirilir ancak bu tokenların ömrü sınırlıdır. "Generate token" işlemi sırasında bir Refresh token ile birlikte yeni bir access token üretilir ve ayrıca "logout" işlemi de sistemde bulunmaktadır.

## İşlem Kontrolleri

Role kontrolleri gibi işlemler, "middleware" (ara yazılım) kullanılarak gerçekleştirilir. Veritabanı ve pgAdmin işlemleri Docker kullanılarak oluşturulur ve dışarı açılır. Kullanıcı ve gönderi kontrol işlemleri fonksiyonlar aracılığıyla yapılır ve gelen veriler için "min," "max," "required," ve "regex" gibi şartlar kullanılarak Joi kütüphanesi ile doğrulama işlemleri gerçekleştirilir. Ayrıca, hatalar özel mesajlarla belirtilmiştir.

## Şifre Güvenliği

Şifrelerin güvenli bir şekilde saklanması için bcrypt kullanılmaktadır. Proje, veritabanı mevcut olduğunda sorunsuz bir şekilde çalışırken, veritabanı mevcut olmadığında veya farklı bir ortamda çalıştırıldığında otomatik bir şekilde adapte olur. Proje başlatıldığında, otomatik olarak bir veritabanı ve ilgili tablolar oluşturmak için bir "migration" işlemi gerçekleştirilir. Bu aşamada ayrıca bir yönetici kullanıcısı da oluşturulur. Bu yaklaşım, projenin farklı ortamlarda kolayca başlatılmasını sağlar.

## Kullanıcı Silme İşlemleri ve Veri Tabanı ORM Kullanımı

Projemizde, kullanıcıların silinmediği ancak silinmiş olarak işaretlendiği bir API sorgusunu gerçekleştirerek bunu ögrenebiliriz. Bu sorgu, veri tabanında gerçekten böyle bir kullanıcının varlığını ve eğer silinmişse ne zaman silindiğini doğrulamamıza olanak tanır. Ayrıca, veri tabanı işlemleri için Sequelize gibi bir ORM (Object-Relational Mapping) aracı kullanılmaktadır.

Bu yaklaşım, kullanıcıların kalıcı olarak silinmeden önce verilerin muhafaza edilmesini sağlar ve kullanıcılar hakkında ayrıntılı bilgilere erişim sağlar. Bu sayede, veri güvenliği ve kullanıcı izleme süreçleri daha etkin bir şekilde yönetilebilir.

Bu TypeScript projesini sizinle paylaşmak istedim.

# Api

## Koleksiyon İçeriği

### User

#### getUser

- **HTTP Method**: GET
- **URL**: `http://localhost:3100`
- **Parametreler**:
  - `username`: ad2 (text)
- **Özel Davranış**: disableBodyPruning: true
- **Response**: []

#### createUser

- **HTTP Method**: POST
- **URL**: `http://localhost:3100`
- **Parametreler**:
  - `username`: deneme12 (text)
  - `password`: Deneme12+ (text)
  - `role`: write (text)
- **Response**: []

#### editRole

- **HTTP Method**: PUT
- **URL**: `http://localhost:3100/role`
- **Parametreler**:
  - `username`: deneme12 (text)
  - `role`: read (text)
- **Response**: []

#### deleteUser

- **HTTP Method**: DELETE
- **URL**: `http://localhost:3100`
- **Parametreler**:
  - `username`: deneme (text)
- **Response**: []

#### editPassword

- **HTTP Method**: PUT
- **URL**: `http://localhost:3100/password`
- **Parametreler**:
  - `oldpassword`: Deneme12+ (text)
  - `newpassword`: Deneme12+ (text)
  - `username`: deneme12 (text)
- **Response**: []

### Posts

#### getPost

- **HTTP Method**: GET
- **URL**: `http://localhost:3100/post`
- **Parametreler**:
  - `postId`: a1bcae75-d192-450e-926f-8947feaee434 (text)
- **Özel Davranış**: disableBodyPruning: true
- **Response**: []

#### createPost

- **HTTP Method**: POST
- **URL**: `http://localhost:3100/post`
- **Parametreler**:
  - `postname`: asdasasdasdasd (text)
  - `postdescription`: asdasdadsasdasdasdasdasdasdasdasdasd (text)
- **Response**: []

#### updatePost

- **HTTP Method**: PUT
- **URL**: `http://localhost:3100/post`
- **Header**:
  - `x-access-token`: [Token Bilgisi] (text)
- **Parametreler**:
  - `postid`: 4db0e82f-0641-40e7-bc13-a67cdbea9828 (text)
  - `postname`: asdasasdasdasdsdas23455 (text)
- **Response**: []

#### deletePost

- **HTTP Method**: DELETE
- **URL**: `http://localhost:3100/post`
- **Response**: []

#### getPostDeleted

- **HTTP Method**: GET
- **Response**: []

#### usergetposts

- **HTTP Method**: GET
- **Response**: []

### Auth

#### createTokens

- **HTTP Method**: GET
- **URL**: `http://localhost:3100/auth/login`
- **Parametreler**:
  - `username`: deneme12 (text)
  - `password`: Deneme12+ (text)
- **Özel Davranış**: disableBodyPruning: true
- **Response**: []

#### generateTokens

- **HTTP Method**: GET
- **Response**: []

#### logout

- **HTTP Method**: GET
- **URL**: `http://localhost:3100/auth/logout`
- **Parametreler**:
  - `username`: deneme12 (text)
- **Özel Davranış**: disableBodyPruning: true
- **Response**: []

