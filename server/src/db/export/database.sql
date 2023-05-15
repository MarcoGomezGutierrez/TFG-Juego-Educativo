-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tfg_database
-- ------------------------------------------------------
-- Server version	5.7.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `niveles`
--

DROP TABLE IF EXISTS `niveles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `niveles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `id_temario` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_temario` (`id_temario`),
  CONSTRAINT `niveles_ibfk_1` FOREIGN KEY (`id_temario`) REFERENCES `temarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `niveles`
--

LOCK TABLES `niveles` WRITE;
/*!40000 ALTER TABLE `niveles` DISABLE KEYS */;
INSERT INTO `niveles` VALUES (1,'Tema 1',1),(2,'Tema 2',1),(3,'Tema 3',1),(4,'Tema 4',1),(5,'Tema 5',1),(6,'Tema 6',1),(7,'Tema 1',2),(8,'Tema 2',2),(9,'Tema 3',2),(10,'Tema 4',2),(11,'Tema 5',2),(12,'Tema 6',2);
/*!40000 ALTER TABLE `niveles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preguntas`
--

DROP TABLE IF EXISTS `preguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preguntas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enunciado` text NOT NULL,
  `id_nivel` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_nivel` (`id_nivel`),
  CONSTRAINT `preguntas_ibfk_1` FOREIGN KEY (`id_nivel`) REFERENCES `niveles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preguntas`
--

LOCK TABLES `preguntas` WRITE;
/*!40000 ALTER TABLE `preguntas` DISABLE KEYS */;
INSERT INTO `preguntas` VALUES (1,'¿Cuáles son las funciones vitales?',1),(2,'¿Cuáles son los tipos de nutrición?',1),(3,'¿Cómo se llaman los animales que no tienen un esqueleto interno?',1),(4,'¿Qué tres partes tienen los animales con esqueleto interno?',1),(5,'¿Cómo se denominan a los animales nacidos de huevos?',1),(6,'¿Cómo se llaman los invertebrados con 6 patas?',1),(7,'¿Cómo se llaman los invertebrados con 8 patas?',1),(8,'¿Cómo se llaman los invertebrados con 10 patas?',1),(9,'¿A qué grupo pertenecen las estrellas de mar?',1),(10,'¿Qué invertebrados tienen el cuerpo formado por anillos?',1),(11,'¿Cuáles son los diferentes tipos de vertebrados?',2),(12,'¿Qué vertebrados tienen pelo?',2),(13,'¿A través de qué respiran los mamíferos?',2),(14,'¿Qué vertebrados tienen el cuerpo cubierto de escamas?',2),(15,'¿Qué vertebrados tienen pico?',2),(16,'¿Por qué proceso pasan algunos anfibios?',2),(17,'¿Cuáles son las etapas de la vida?',3),(18,'¿En qué etapa de la vida está una persona con 18 años?',3),(19,'¿Qué sustancias están presentes en los alimentos?',3),(20,'¿Cuál no es un hábito saludable?',3),(21,'¿Qué nutrientes tiene la leche?',3),(22,'¿Qué alimento tiene hidratos de carbono?',3),(23,'¿Qué expresa la cantidad de la materia?',4),(24,'¿Qué es el volumen de un cuerpo?',4),(25,'Un ejemplo de una sustancia pura es…',4),(26,'¿Qué dos tipos de mezclas existen?',4),(27,'Un ejemplo de una mezcla heterogénea es',4),(28,'¿Cuáles son los tres estados de la materia?',4),(29,'¿Cómo se llama el cambio de estado de sólido a líquido?',4),(30,'Si una manzana se pudre, ha sufrido un cambio…',4),(31,'¿Cuáles son los dos tipos de materiales según su origen?',4),(32,'¿De qué tipo de origen proviene un bolso?',4),(33,'¿Cuál es la propiedad más importante de una ventana?',4),(34,'¿Cuáles son las tres R?',4),(35,'¿Qué tipo de energía produce el movimiento?',5),(36,'¿Cuál es un ejemplo de energía química?',5),(37,'¿Qué cambio se produce cuándo le cambiamos encendemos el horno?',5),(38,'¿Qué dos tipos de fuentes de energía conocemos?',5),(39,'¿Cuál es la fuente de energía de la energía eólica?',5),(40,'¿Cómo obtenemos la energía solar?',5),(41,'¿Cuáles son las energías no renovables?',5),(42,'¿Qué podemos hacer para ahorrar energía?',5),(43,'¿Qué tipo de máquinas conocemos?',6),(44,'¿Cuál de estas máquinas es una máquina simple?',6),(45,'¿Cuál es un ejemplo de máquina eléctrica?',6),(46,'¿Qué máquina utiliza el ascensor para subir y bajar?',6),(47,'¿Cuál NO es uno de los componentes de una bicicleta?',6),(48,'¿Qué problemas pueden traer utilizar las máquinas de manera incorrecta?',6),(49,'¿Cuál es el centro del Sistema Solar?',7),(50,'¿Qué es el sol?',7),(51,'¿Cuántos planetas hay en el Sistema Solar?',7),(52,'¿Cómo se llama nuestro planeta?',7),(53,'¿Cómo se llama el movimiento que realiza la Tierra sobre el Sol?',7),(54,'¿Cómo se llama el movimiento que produce el día y la noche?',7),(55,'¿Cuánto tarda la Tierra en girar sobre sí misma?',7),(56,'¿Qué produce la traslación?',7),(57,'¿Cuánto tarda la Tierra en girar alrededor del Sol?',7),(58,'¿Qué es la Luna?',7),(59,'¿Cuánto tarda en girar alrededor de la Tierra?',7),(60,'¿En qué afecta la Luna a la Tierra?',7),(61,'¿Cómo se llama nuestra galaxia?',7),(62,'¿Qué instrumento utilizamos para observar el espacio?',7),(63,'¿Cómo se llama la capa gaseosa que rodea la Tierra?',8),(64,'¿De qué está hecha la atmósfera?',8),(65,'¿Cómo se llama al conjunto de partes líquidas de la Tierra?',8),(66,'¿Cómo se llama la gran esfera de rocas?',8),(67,'¿En qué partes se divide la geosfera?',8),(68,'¿Cuántos continentes existen en nuestro planeta?',8),(69,'¿Cómo podemos representar nuestro planeta?',8),(70,'¿Cuáles son los cuatro puntos cardinales?',8),(71,'¿Qué tipos de paisajes existen?',9),(72,'¿Qué tipo de paisaje humanizado es una ciudad?',9),(73,'¿Qué dos tipos de paisajes existen?',9),(74,'¿Cómo se llama el terreno totalmente rodeado por agua?',9),(75,'¿Cómo se llama al terreno plano que está elevado?',9),(76,'¿En qué partes se divide una montaña?',9),(77,'¿Qué mares rodean a la Península Ibérica?',9),(78,'¿Qué río nace en Cantabria?',9),(79,'¿Cuáles son los archipiélagos de España?',9),(80,'¿Cuál NO es un parque nacional de España?',9),(81,'¿Qué tres sectores económicos existen?',10),(82,'¿Quién trabaja en el sector primario?',10),(83,'¿Quién trabaja en el sector secundario?',10),(84,'¿Quién trabaja en el sector servicios?',10),(85,'¿Qué sector recoge las materias primas?',10),(86,'¿Qué sector transforma las materias primas en productos?',10),(87,'¿Cómo podemos medir las horas?',11),(88,'¿Cómo podemos medir los meses de un año?',11),(89,'¿Cuántos años son un lustro?',11),(90,'¿Cuántos años son una década?',11),(91,'¿Cuántos años son un siglo?',11),(92,'¿Cuántos años son un milenio?',11),(93,'¿Cómo se llaman los periodos de tiempo de la historia?',11),(94,'¿Quiénes se dedican a estudiar la Historia?',11),(95,'¿Qué actividades realizaban las tribus en la Prehistoria?',12),(96,'¿Dónde vivían los primeros seres humanos?',12),(97,'¿Qué actividades realizaban los primeros pobladores?',12),(98,'¿En qué edad de la historia aparecen las primeras ciudades?',12),(99,'¿De qué civilización es característica los jeroglíficos?',12),(100,'¿Qué idioma nos dejaron los romanos?',12),(101,'¿Qué dos zonas existían en la Edad Media?',12),(102,'¿Dónde vivían los aldeanos en los reinos cristianos?',12),(103,'¿Dónde rezaban los musulmanes?',12),(104,'¿Qué población de la Edad Media se dedicaba al comercio, ciencia y arte?',12),(105,'¿Qué edad de la historia ocurrió después de la Edad Media?',12),(106,'¿Qué gran descubrimiento hubo en la Edad Moderna?',12),(107,'¿Qué edad de la historia estamos viviendo ahora mismo?',12);
/*!40000 ALTER TABLE `preguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuestas`
--

DROP TABLE IF EXISTS `respuestas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respuestas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `texto` text NOT NULL,
  `correcta` tinyint(1) NOT NULL DEFAULT '0',
  `id_pregunta` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pregunta` (`id_pregunta`),
  CONSTRAINT `respuestas_ibfk_1` FOREIGN KEY (`id_pregunta`) REFERENCES `preguntas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=429 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuestas`
--

LOCK TABLES `respuestas` WRITE;
/*!40000 ALTER TABLE `respuestas` DISABLE KEYS */;
INSERT INTO `respuestas` VALUES (1,'Nutrición, relación y reproducción',1,1),(2,'Nutrición y reproducción',0,1),(3,'Nutrición y descanso',0,1),(4,'Relación y reproducción',0,1),(5,'Carne, pescado y verdura',0,2),(6,'Carnívora y herbívora',0,2),(7,'Carnívora, herbívora y omnívora',1,2),(8,'Omnívora y herbívora',0,2),(9,'Vertebrados',0,3),(10,'Invertebrados',1,3),(11,'Deshuesados',0,3),(12,'Mentebrados',0,3),(13,'Cabeza y tronco',0,4),(14,'Extremidades y cabeza',0,4),(15,'Tronco, extremidades y pico',0,4),(16,'Cabeza, tronco y extremidades',1,4),(17,'Vivíparos',0,5),(18,'Ovíparos',1,5),(19,'Ovovivíparos',0,5),(20,'Lovíparosos',0,5),(21,'Insectos',1,6),(22,'Crustáceos',0,6),(23,'Arácnidos ',0,6),(24,'Reptiles',0,6),(25,'Arácnidos ',1,7),(26,'Insectos',0,7),(27,'Crustáceos',0,7),(28,'Reptiles',0,7),(29,'Insectos',0,8),(30,'Arácnidos',0,8),(31,'Reptiles',0,8),(32,'Crustáceos',1,8),(33,'Moluscos',0,9),(34,'Equinodermos',1,9),(35,'Poríferos',0,9),(36,'Insectos',0,9),(37,'Equinodermos',0,10),(38,'Gusanos',1,10),(39,'Moluscos',0,10),(40,'Medusas',0,10),(41,'Animales, pájaros, reptiles, peces y anfibios',0,11),(42,'Mamíferos, aves y peces',0,11),(43,'Mamíferos, aves, reptiles, peces y anfibios',1,11),(44,'Mamíferos, pájaros, reptiles y anfibios',0,11),(45,'Reptiles',0,12),(46,'Mamíferos',1,12),(47,'Peces',0,12),(48,'Anfibios',0,12),(49,'Branquias',0,13),(50,'Piel',0,13),(51,'Pulmones',1,13),(52,'Pelo',0,13),(53,'Mamíferos y peces',0,14),(54,'Reptiles y peces',1,14),(55,'Aves y reptiles',0,14),(56,'Mamíferos y anfibios',0,14),(57,'Mamíferos',0,15),(58,'Reptiles',0,15),(59,'Aves',1,15),(60,'Anfibios',0,15),(61,'Transformación',0,16),(62,'Evolución',0,16),(63,'Protosis',0,16),(64,'Metamorfosis',1,16),(65,'Infancia, Juventud, Madurez y Ancianidad',0,17),(66,'Infancia, Adolescencia, Juventud, Madurez y Ancianidad',1,17),(67,'Infancia, Adolescencia, Juventud, Adultez y Ancianismo',0,17),(68,'Niñez, Adolescencia, Juventud, Adultez y Ancianidad',0,17),(69,'Juventud',1,18),(70,'Infancia',0,18),(71,'Madurez',0,18),(72,'Adolescencia',0,18),(73,'Cereales',0,19),(74,'Nutritivos',0,19),(75,'Potencias',0,19),(76,'Nutrientes',1,19),(77,'Buena alimentación',0,20),(78,'Buena higiene',0,20),(79,'Dormir pocas horas',1,20),(80,'Hacer ejercicio físico',0,20),(81,'Hidratos de carbono',0,21),(82,'Vitaminas',0,21),(83,'Proteínas',1,21),(84,'Grasas',0,21),(85,'Arroz',1,22),(86,'Verdura',0,22),(87,'Carne',0,22),(88,'Palomitas',0,22),(89,'Volumen',0,23),(90,'Masa',1,23),(91,'Distancia',0,23),(92,'Electricidad',0,23),(93,'El peso de la materia',0,24),(94,'La luminosidad de la materia',0,24),(95,'La altura que tiene la materia',0,24),(96,'El espacio que ocupa la materia',1,24),(97,'La ensalada',0,25),(98,'El oro',1,25),(99,'El pan',0,25),(100,'La limonada',0,25),(101,'Heterogénea y hilogénea',0,26),(102,'Hilogénea y homogénea',0,26),(103,'Heterogénea y homogénea',1,26),(104,'Huterogénea y heterogénea',0,26),(105,'Una ensalada',1,27),(106,'El café',0,27),(107,'Un zumo de naranja',0,27),(108,'Una sopa de tomate',0,27),(109,'Físico, líquido y airoso',0,28),(110,'Físico, acuático y airoso',0,28),(111,'Sólido, líquido y gaseoso',1,28),(112,'Sólido, acuático y gaseoso',0,28),(113,'Fusión',1,29),(114,'Vaporización',0,29),(115,'Solidificación',0,29),(116,'Condensación',0,29),(117,'Químico',1,30),(118,'Físico',0,30),(119,'Artificial',0,30),(120,'Material',0,30),(121,'Humanizado y natural',0,31),(122,'Orgánico y humanizado',0,31),(123,'Orgánico y artificial',0,31),(124,'Natural y artificial',1,31),(125,'Vegetal',0,32),(126,'Animal',1,32),(127,'Mineral',0,32),(128,'Artificial',0,32),(129,'Transparencia',1,33),(130,'Conducción del calor',0,33),(131,'Elasticidad',0,33),(132,'Impermeabilidad',0,33),(133,'Reusar, reciclar y restringir',0,34),(134,'Reciclar, reusar y restringir',0,34),(135,'Reciclar, reutilizar y reducir',1,34),(136,'Reducir, reutilizar y repetir',0,34),(137,'Calorífica',0,35),(138,'Sonora',0,35),(139,'Luminosa',0,35),(140,'Cinética',1,35),(141,'Una bombilla',0,36),(142,'La comida',1,36),(143,'Una guitarra',0,36),(144,'La electricidad',0,36),(145,'De energía eléctrica a energía calorífica',1,37),(146,'De energía eléctrica a energía cinética',0,37),(147,'De energía luminosa a energía calorífica',0,37),(148,'De energía calorífica a energía eléctrica',0,37),(149,'Infinitas y renovables',0,38),(150,'Limitadas y No limitadas',0,38),(151,'Renovables y No renovables',1,38),(152,'Renovables y limitadas',0,38),(153,'El movimiento del mar',0,39),(154,'El viento',1,39),(155,'El sol',0,39),(156,'Los animales',0,39),(157,'Mediante aerogeneradores',0,40),(158,'Mediante baterías',0,40),(159,'Mediante paneles solares',1,40),(160,'Mediante fábricas',0,40),(161,'Carbón y fósiles',0,41),(162,'Petróleo, fósiles y gas',0,41),(163,'Carbón y gas',0,41),(164,'Carbón, petróleo y gas',1,41),(165,'Usar el transporte público',1,42),(166,'Dejar las luces encendidas',0,42),(167,'Utilizar mucho la calefacción',0,42),(168,'Estar mucho tiempo en la ducha',0,42),(169,'Normales y diferentes',0,43),(170,'Viejas y antiguas',0,43),(171,'Simples y compuestas',1,43),(172,'Electrónicas y tecnológicas',0,43),(173,'La televisión',0,44),(174,'El martillo',1,44),(175,'La bicicleta',0,44),(176,'El ordenador',0,44),(177,'Sierra',0,45),(178,'Martillo',0,45),(179,'Destornillador',0,45),(180,'Semáforo',1,45),(181,'La rueda',0,46),(182,'La polea',1,46),(183,'El plano inclinado',0,46),(184,'La palanca',0,46),(185,'Manillar',0,47),(186,'Rueda',0,47),(187,'Eje',0,47),(188,'Enchufe',1,47),(189,'La contaminación',1,48),(190,'La evolución de las máquinas',0,48),(191,'Creación de nuevas máquinas',0,48),(192,'La industrialización',0,48),(193,'La Tierra',0,49),(194,'El Sol',1,49),(195,'Saturno',0,49),(196,'La Luna',0,49),(197,'Una estrella',1,50),(198,'Un planeta',0,50),(199,'Un asteroide',0,50),(200,'Un satélite',0,50),(201,'Siete planetas',0,51),(202,'Cuatro planetas',0,51),(203,'Ocho planetas',1,51),(204,'Veinte planetas',0,51),(205,'El planeta rojo',0,52),(206,'Venus',0,52),(207,'La Tierra',1,52),(208,'Júpiter',0,52),(209,'Rotación',0,53),(210,'Traslación',1,53),(211,'Giración',0,53),(212,'Movimiento pendular',0,53),(213,'Rotación',1,54),(214,'Traslación',0,54),(215,'Giración',0,54),(216,'Movimiento pendular',0,54),(217,'18 horas',0,55),(218,'3 días',0,55),(219,'24 horas',1,55),(220,'12 horas',0,55),(221,'Extinción de especies',0,56),(222,'El movimiento de los continentes',0,56),(223,'El día y la noche',0,56),(224,'Las estaciones',1,56),(225,'24 horas',0,57),(226,'300 días',0,57),(227,'12 horas',0,57),(228,'365 días',1,57),(229,'Un planeta',0,58),(230,'El satélite de la Tierra',1,58),(231,'Un cometa',0,58),(232,'Un gran asteroide',0,58),(233,'60 días',0,59),(234,'1 año',0,59),(235,'24 horas',0,59),(236,'28 días',1,59),(237,'Afecta a los continentes',0,60),(238,'Afecta a las mareas',1,60),(239,'Afecta a los desiertos',0,60),(240,'Afecta a los bebés',0,60),(241,'Vía Láctea',1,61),(242,'La Tierra',0,61),(243,'Galaxia humana',0,61),(244,'Interestelar',0,61),(245,'Microscopio',0,62),(246,'Ordenador',0,62),(247,'Telescopio',1,62),(248,'Televisor',0,62),(249,'Hidrosfera',0,63),(250,'Litosfera',0,63),(251,'Atmósfera',1,63),(252,'Núcleo',0,63),(253,'Está formada por rocas',0,64),(254,'Está formada por gases',1,64),(255,'Está formada por agua',0,64),(256,'Está formada por lava',0,64),(257,'Geosfera',0,65),(258,'Litosfera',0,65),(259,'Atmósfera',0,65),(260,'Hidrosfera',1,65),(261,'Geosfera',1,66),(262,'Atmósfera',0,66),(263,'Hidrosfera',0,66),(264,'Núcleo',0,66),(265,'Borde, manto y núcleo',0,67),(266,'Corteza terrestre, manto y centro',0,67),(267,'Borde, manto y centro',0,67),(268,'Corteza terrestre, manto y núcleo',1,67),(269,'Siete',0,68),(270,'Cinco',0,68),(271,'Seis',1,68),(272,'Ocho',0,68),(273,'Mediante el globo terráqueo o mapas',1,69),(274,'Solo mediante el globo terráqueo',0,69),(275,'Solo mediante mapas',0,69),(276,'Solo mediante imágenes',0,69),(277,'Arriba, Abajo, Derecha e Izquierda',0,70),(278,'Noroeste, Sureste, Este y Oeste',0,70),(279,'Norte, Sur, Derecha e Izquierda',0,70),(280,'Norte, Sur, Este y Oeste',1,70),(281,'Artificiales y urbanos',0,71),(282,'Naturales y humanizados',1,71),(283,'Naturales y modernos',0,71),(284,'Humanizados y artificiales',0,71),(285,'Natural',0,72),(286,'Urbano',1,72),(287,'Rural',0,72),(288,'Antiguo',0,72),(289,'De costa y de interior',1,73),(290,'Está formada por rocas',0,73),(291,'Está formada por agua',0,73),(292,'Está formada por lava',0,73),(293,'Acantilado',0,74),(294,'Litoral',0,74),(295,'Cabo',0,74),(296,'Isla',1,74),(297,'Llanura',0,75),(298,'Sierra',0,75),(299,'Cordillera',0,75),(300,'Meseta',1,75),(301,'Cima, ladera y falda',1,76),(302,'Pico, falda y cuesta',0,76),(303,'Cima, ladera y llanura',0,76),(304,'Pico, ladera y llanura',0,76),(305,'Mediterráneo y Cantábrico',1,77),(306,'Atlántico y Mediterráneo',0,77),(307,'Cantábrico y Atlántico',0,77),(308,'Atlántico y Pacífico',0,77),(309,'El río Guadalquivir',0,78),(310,'El río Miño',0,78),(311,'El río Guadiana',0,78),(312,'El río Ebro',1,78),(313,'Ceuta y Melilla',0,79),(314,'Canarias y Baleares',1,79),(315,'Tenerife y Mallorca',0,79),(316,'Canarias y Galápagos',0,79),(317,'Doyana',1,80),(318,'Los Picos de Europa',0,80),(319,'Monfragüe',0,80),(320,'Timanfaya',0,80),(321,'Primero, segundo y tercero',0,81),(322,'Agricultura, industria y servicios',0,81),(323,'Primario, secundario y de servicios',1,81),(324,'Primario, segundo y servicial',0,81),(325,'Artesanos',0,82),(326,'Agricultores',1,82),(327,'Policías',0,82),(328,'Panaderos',0,82),(329,'Policías',0,83),(330,'Profesores',0,83),(331,'Pescadores',0,83),(332,'Artesanos',1,83),(333,'Panaderos',0,84),(334,'Profesores',1,84),(335,'Artesanos',0,84),(336,'Agricultores',0,84),(337,'Secundario',0,85),(338,'De servicios',0,85),(339,'De recolecta',0,85),(340,'Primario',1,85),(341,'Secundario',1,86),(342,'Primario',0,86),(343,'De servicios',0,86),(344,'De elaboración',0,86),(345,'Con el calendario',0,87),(346,'Con los dedo',0,87),(347,'Con el reloj',1,87),(348,'Con un reloj de arena',0,87),(349,'Con el reloj',0,88),(350,'Con el calendario',1,88),(351,'Con los lustros',0,88),(352,'Con el cronómetro',0,88),(353,'5 años',1,89),(354,'10 años',0,89),(355,'50 años',0,89),(356,'20 años',0,89),(357,'100 años',0,90),(358,'20 años',0,90),(359,'10 años',1,90),(360,'40 años',0,90),(361,'1000 años',0,91),(362,'10 años',0,91),(363,'10.000 años',0,91),(364,'100 años',1,91),(365,'100 años',0,92),(366,'10.000 años',0,92),(367,'1000 años',1,92),(368,'500 años',0,92),(369,'Edades de la historia',1,93),(370,'Momentos históricos',0,93),(371,'Momentos de la historia',0,93),(372,'Edad histórica',0,93),(373,'Los profesores',0,94),(374,'Los científicos',0,94),(375,'Los historiadores',1,94),(376,'Los detectives',0,94),(377,'Agricultura',0,95),(378,'Ganadería',0,95),(379,'Artesanía',0,95),(380,'Cazar y recolectar',1,95),(381,'En cuevas',1,96),(382,'En ciudades',0,96),(383,'En el campo',0,96),(384,'En los bosques',0,96),(385,'Caza y recolecta',0,97),(386,'Caza',0,97),(387,'Agricultura y ganadería',1,97),(388,'Crear máquinas',0,97),(389,'Edad Antigua',1,98),(390,'Prehistoria',0,98),(391,'Edad Moderna',0,98),(392,'Edad Contemporánea',0,98),(393,'Españoles',0,99),(394,'Romanos',0,99),(395,'Musulmanes',0,99),(396,'Egipcios',1,99),(397,'El latín',1,100),(398,'El español',0,100),(399,'El romano',0,100),(400,'El inglés',0,100),(401,'Cristiana y romana',0,101),(402,'Romana y musulmana',0,101),(403,'Cristiana y musulmana',1,101),(404,'Musulmana y asiática',0,101),(405,'Alrededor del castillo',1,102),(406,'Dentro del castillo',0,102),(407,'Enfrente del castillo',0,102),(408,'Detrás del castillo',0,102),(409,'En la iglesia',0,103),(410,'En la mezquita',1,103),(411,'En el castillo',0,103),(412,'En casa',0,103),(413,'Egipcios',0,104),(414,'Cristianos',0,104),(415,'Musulmanes',1,104),(416,'Españoles',0,104),(417,'Edad Contemporánea',0,105),(418,'Edad Antigua',0,105),(419,'Prehistoria',0,105),(420,'Edad Moderna',1,105),(421,'América',1,106),(422,'Asia',0,106),(423,'Europa',0,106),(424,'África',0,106),(425,'Edad Contemporánea',1,107),(426,'Edad Moderna',0,107),(427,'Edad Global',0,107),(428,'Edad Futurística',0,107);
/*!40000 ALTER TABLE `respuestas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temarios`
--

DROP TABLE IF EXISTS `temarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temarios`
--

LOCK TABLES `temarios` WRITE;
/*!40000 ALTER TABLE `temarios` DISABLE KEYS */;
INSERT INTO `temarios` VALUES (1,'Ciencias Naturales'),(2,'Ciencias Sociales');
/*!40000 ALTER TABLE `temarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'marcoasdasd','marcogomezgutierrez@gmail.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','2023-05-06 14:20:43','2023-05-06 14:20:43'),(4,'paquito chocolatero','pacodehuelva@gmail.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','2023-05-06 18:08:09','2023-05-06 18:08:09'),(5,'pepito','pepebotella@gmail.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','2023-05-06 18:37:17','2023-05-06 18:37:17'),(6,'marco','marco@gmail.co','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','2023-05-07 07:56:17','2023-05-07 07:56:17'),(7,'admin','admin@gmail.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','2023-05-07 14:24:41','2023-05-07 14:24:41');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-15 17:10:00
