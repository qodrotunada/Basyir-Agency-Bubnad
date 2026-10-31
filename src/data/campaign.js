// Basyir Agency — materi Bahasa Arab MA Kelas XI (Kemenag RI, 2020).
// Nomor halaman adalah nomor halaman cetak buku. Cerita misi merupakan konteks game,
// bukan teks sumber buku. Materi akademik merujuk pada isi bab dan daftar mufradat.
const ev=(id,vocabularyId,nameAr,transliteration,meaningIndo,glyph,clue,hintText,hotspot)=>({id,vocabularyId,nameAr,transliteration,meaningIndo,glyph,clue,hintText,hotspot});
const piece=(id,textArabic,transliteration,translation)=>({id,textArabic,transliteration,translation});
const suspect=(id,name,nameAr,role,alibi,policeNote,isGuilty,initials)=>({id,name,nameAr,role,alibi,policeNote,isGuilty,initials});
const q=(id,mode,prompt,options,correctIndex,explanation,vocabularyId=null,arabicPrompt=false)=>{
 const shift=[...id].reduce((s,c)=>s+c.charCodeAt(0),0)%options.length;
 const ordered=options.slice(shift).concat(options.slice(0,shift));
 return {id,mode,prompt,options:ordered,correctIndex:ordered.indexOf(options[correctIndex]),explanation,vocabularyId,arabicPrompt:Boolean(arabicPrompt&&/^[\u0600-\u06FF]/.test(prompt.trim()))};
};
const v=(vocabId,arabic,transliteration,meaningIndo,partOfSpeech,chapter,exampleArabic,exampleMeaning)=>({
 vocabId,arabic,transliteration,meaningIndo,partOfSpeech,level:'MA XI',sourceEpisodeIds:[chapter],
 exampleSentences:[{arabic:exampleArabic,transliteration:'',meaningIndo:exampleMeaning,origin:'Adaptasi latihan dari mufradat/tema buku; bukan kutipan langsung; perlu validasi guru.'}]
});
const S=(chapterId,type,title,titleArabic,objective,sourcePages,material,vocabularyIds,examples,tasks,rubric=null)=>({
 id:`${chapterId}-${type}`,type,title,titleArabic,objective,sourcePages,sourceBook:'Bahasa Arab MA Kelas XI, Kementerian Agama RI, 2020',contentStatus:'draft-needs-teacher-validation',material,vocabularyIds,examples:examples.map((item)=>({...item,origin:item.origin??'Adaptasi latihan; bukan kutipan langsung dari buku.'})),
 activities:tasks.map((t,i)=>Array.isArray(t)?({id:`${chapterId}-${type}-${i+1}`,type:t[0],prompt:t[1],expectedAnswer:t[2],feedbackCorrect:t[3],feedbackIncorrect:'Periksa kembali petunjuk, teks, dan contoh pada materi.',hint:t[4]}):({...t,id:t.id??`${chapterId}-${type}-${i+1}`,feedbackIncorrect:t.feedbackIncorrect??'Periksa kembali petunjuk, teks, dan contoh pada materi.'})),
 ...(rubric?{rubric}:{})
});
const L=(chapterId,skills)=>skills;
const missionTasks=(chapterId,tasks)=>tasks.map((t,i)=>({id:`${chapterId}-mission-${i+1}`,type:['hidden-object','matching','sequence','grammar-puzzle','oral-report'][i],prompt:t[0],expectedAnswer:t[1],feedbackCorrect:t[2],feedbackIncorrect:'Bandingkan kembali bukti dan materi bab.',hint:t[3]}));

export const CAMPAIGN_CONFIG={
 campaignId:'basyir-main',version:'2.0.0',title:'Arsip Pengetahuan Basyir Agency',
 episodeOrder:['ch01-shopping','ch02-health','ch03-travel','ch04-hajj-umrah','ch05-ict','ch06-religions'],
 semesterOrder:{ganjil:['ch01-shopping','ch02-health','ch03-travel'],genap:['ch04-hajj-umrah','ch05-ict','ch06-religions']},
 structure:{chapters:6,sublevelsPerChapter:6,totalSublevels:36,activitiesPerSublevel:5}
};

export const BOOK_VALIDATION_NOTES=[
 {chapterId:'ch04-hajj-umrah',issue:'Daftar isi mencantumkan أقسام الفعل – المذكر والمؤنث, sedangkan KD, indikator, pembahasan kaidah, dan rangkuman isi Bab 4 mengajarkan تصريف الفعل الماضي اللغوي.',implementation:'Patch materi mengikuti isi pembahasan dan rangkuman Bab 4: تصريف الفعل الماضي اللغوي.',references:'Bab 4, halaman cetak 55–71; KD/indikator 55–56; kaidah/rangkuman 63–71.'},
 {chapterId:'ch05-ict',issue:'Daftar isi mencantumkan تصريف الفعل الماضي اللغوي untuk Bab 5, sedangkan KD, indikator, pembahasan kaidah, dan rangkuman isi Bab 5 mengajarkan تصريف الفعل المضارع اللغوي.',implementation:'Patch materi mengikuti isi pembahasan dan rangkuman Bab 5: تصريف الفعل المضارع اللغوي.',references:'Bab 5, halaman cetak 72–86; KD/indikator 72–73; kaidah/rangkuman 79–86.'},
 {chapterId:'ch06-religions',issue:'Daftar isi mencantumkan تصريف الفعل المضارع اللغوي untuk Bab 6, sedangkan KD, indikator, pembahasan kaidah, dan rangkuman isi Bab 6 mengajarkan الجملة الاسمية والجملة الفعلية.',implementation:'Patch materi mengikuti isi pembahasan dan rangkuman Bab 6: الجملة الاسمية والجملة الفعلية.',references:'Bab 6, halaman cetak 87–100; KD/indikator 87–88; kaidah/rangkuman 93–100.'}
];

export const VOCABULARY_REGISTRY={
 'shop.market':v('shop.market','السُّوقُ التَّقْلِيدِيُّ','as-sūqu at-taqlīdiyyu','pasar tradisional','frasa isim','ch01-shopping','ذَهَبَ الْوَالِدُ وَالِابْنُ إِلَى السُّوقِ التَّقْلِيدِيِّ.','Ayah dan anak pergi ke pasar tradisional.'),
 'shop.supermarket':v('shop.supermarket','الْمُجَمَّعُ التِّجَارِيُّ','al-mujammaʿu at-tijāriyyu','pusat perbelanjaan','frasa isim','ch01-shopping','الْمُجَمَّعُ التِّجَارِيُّ مَكَانٌ تُبَاعُ فِيهِ الْحَاجَاتُ الْيَوْمِيَّةُ.','Pusat perbelanjaan adalah tempat kebutuhan sehari-hari dijual.'),
 'shop.buyer':v('shop.buyer','الْمُشْتَرِي','al-musytarī','pembeli','isim','ch01-shopping','الْمُشْتَرِي يَدْفَعُ الثَّمَنَ لِلْمُحَاسِبِ.','Pembeli membayar harga kepada kasir.'),
 'shop.vegetables':v('shop.vegetables','خَضْرَوَاتٌ','khaḍrawātun','sayur-sayuran','isim','ch01-shopping','يَشْتَرِي الزَّبُونُ الْخَضْرَوَاتِ الطَّازَجَةَ.','Pembeli membeli sayuran segar.'),
 'shop.fruits':v('shop.fruits','فَوَاكِهُ','fawākihu','buah-buahan','isim','ch01-shopping','يَشْتَرِي النَّاسُ الْفَوَاكِهَ الْمُتَنَوِّعَةَ.','Orang-orang membeli buah-buahan yang beragam.'),
 'shop.meat':v('shop.meat','لَحْمٌ','laḥmun','daging','isim','ch01-shopping','سِعْرُ اللَّحْمِ مِائَةُ أَلْفِ رُوبِيَّةٍ لِلْكِيلُو الْوَاحِدِ.','Harga daging seratus ribu rupiah per kilogram.'),
 'shop.scale':v('shop.scale','مِيزَانٌ','mīzānun','timbangan','isim','ch01-shopping','يَزِنُ الْبَائِعُ اللَّحْمَ بِالْمِيزَانِ.','Penjual menimbang daging dengan timbangan.'),
 'shop.price':v('shop.price','ثَمَنٌ / سِعْرٌ','thamanun / siʿrun','harga','isim','ch01-shopping','سِعْرُ السُّكَّرِ خَمْسُونَ أَلْفَ رُوبِيَّةٍ لِلْكِيلُو الْوَاحِدِ.','Harga gula lima puluh ribu rupiah per kilogram.'),
 'shop.discount':v('shop.discount','تَخْفِيضٌ','takhfīḍun','diskon','isim','ch01-shopping','تُوجَدُ تَخْفِيضَاتٌ كَبِيرَةٌ فِي الْمَلَابِسِ.','Terdapat diskon besar pada pakaian.'),
 'shop.fresh':v('shop.fresh','طَازَجٌ','ṭāzijun','segar','sifat','ch01-shopping','يَشْتَرِي الزَّبُونُ الْخَضْرَوَاتِ الطَّازَجَةَ.','Pembeli membeli sayuran segar.'),
 'shop.sugar':v('shop.sugar','سُكَّرٌ','sukkarun','gula','isim','ch01-shopping','يَجِدُ النَّاسُ السُّكَّرَ فِي قِسْمِ الْمَأْكُولَاتِ.','Orang-orang menemukan gula di bagian makanan.'),
 'shop.oil':v('shop.oil','زَيْتٌ','zaytun','minyak','isim','ch01-shopping','سِتُّونَ أَلْفَ رُوبِيَّةٍ لِلِّتْرِ الْوَاحِدِ.','Enam puluh ribu rupiah per liter.'),
 'health.hospital':v('health.hospital','مُسْتَشْفًى','mustasyfan','rumah sakit','isim','ch02-health','ذَهَبَ مُحَمَّدٌ إِلَى الْمُسْتَشْفَى.','Muhammad pergi ke rumah sakit.'),
 'health.pharmacy':v('health.pharmacy','صَيْدَلِيَّةٌ','ṣaydaliyyatun','apotek','isim','ch02-health','أَذْهَبُ إِلَى الصَّيْدَلِيَّةِ.','Saya pergi ke apotek.'),
 'health.fever':v('health.fever','حُمَّى','ḥummā','demam','isim','ch02-health','أَشْعُرُ بِارْتِفَاعٍ فِي دَرَجَةِ الْحَرَارَةِ.','Saya merasa suhu badan meningkat.'),
 'health.headache':v('health.headache','صُدَاعٌ','ṣudāʿun','sakit kepala','isim','ch02-health','أَشْعُرُ بِالصُّدَاعِ.','Saya merasa sakit kepala.'),
 'health.chest':v('health.chest','صَدْرٌ','ṣadrun','dada','isim','ch02-health','أَشْعُرُ بِأَلَمٍ فِي صَدْرِي.','Saya merasa nyeri di dada.'),
 'health.thermometer':v('health.thermometer','مِقْيَاسُ الْحَرَارَةِ','miqyāsu al-ḥarārati','termometer','frasa isim','ch02-health','دَعْنِي أَقِسْ حَرَارَتَكَ بِمِقْيَاسِ الْحَرَارَةِ.','Biarkan saya mengukur suhu badanmu dengan termometer.'),
 'health.prescription':v('health.prescription','وَصْفَةٌ طِبِّيَّةٌ','waṣfatun ṭibbiyyatun','resep dokter','frasa isim','ch02-health','سَأُعْطِيكَ وَصْفَةً طِبِّيَّةً.','Saya akan memberimu resep dokter.'),
 'health.nurse':v('health.nurse','مُمَرِّضَةٌ','mumarriḍatun','perawat perempuan','isim','ch02-health','سَوْفَ تَدْعُوكَ الْمُمَرِّضَةُ هُنَاكَ.','Perawat akan memanggilmu di sana.'),
 'health.medicine':v('health.medicine','دَوَاءٌ','dawāʾun','obat','isim','ch02-health','تَنَاوَلِ الدَّوَاءَ فِي وَقْتِهِ الْمُحَدَّدِ.','Minumlah obat pada waktu yang ditentukan.'),
 'health.throat':v('health.throat','حَلْقٌ','ḥalqun','tenggorokan','isim','ch02-health','هُنَاكَ الْتِهَابٌ فِي حَلْقِكَ.','Ada radang di tenggorokanmu.'),
 'health.bloodpressure':v('health.bloodpressure','ضَغْطُ الدَّمِ','ḍaghṭu ad-dami','tekanan darah','frasa isim','ch02-health','لَيْسَ لَدَيْكَ مُشْكِلَةٌ فِي ضَغْطِ الدَّمِ.','Kamu tidak memiliki masalah pada tekanan darah.'),
 'travel.traveler':v('travel.traveler','مُسَافِرٌ','musāfirun','orang yang bepergian','isim','ch03-travel','سَافَرَ فَاتِحٌ مَعَ عَائِلَتِهِ.','Fatih bepergian bersama keluarganya.'),
 'travel.passport':v('travel.passport','جَوَازُ السَّفَرِ','jawāzu as-safari','paspor','frasa isim','ch03-travel','يُجَهِّزُ مُحَمَّدٌ جَوَازَ السَّفَرِ قَبْلَ الرِّحْلَةِ.','Muhammad menyiapkan paspor sebelum perjalanan.'),
 'travel.suitcase':v('travel.suitcase','حَقِيبَةٌ','ḥaqībatun','koper/tas','isim','ch03-travel','أَخَذَ الْمُسَافِرُ حَقِيبَتَهُ.','Pelancong membawa kopernya.'),
 'travel.airport':v('travel.airport','مَطَارٌ','maṭārun','bandara','isim','ch03-travel','وَصَلَتِ الطَّائِرَةُ إِلَى الْمَطَارِ.','Pesawat tiba di bandara.'),
 'travel.hotel':v('travel.hotel','فُنْدُقٌ','funduqun','hotel','isim','ch03-travel','سَكَنُوا فِي الْفُنْدُقِ.','Mereka tinggal di hotel.'),
 'travel.beach':v('travel.beach','شَاطِئُ الْبَحْرِ','syāṭiʾu al-baḥri','pantai','frasa isim','ch03-travel','زَارَ فَاتِحٌ شَاطِئَ كُوتَا.','Fatih mengunjungi Pantai Kuta.'),
 'travel.airplane':v('travel.airplane','طَائِرَةٌ','ṭāʾiratun','pesawat','isim','ch03-travel','سَافَرَ فَاتِحٌ بِالطَّائِرَةِ.','Fatih bepergian dengan pesawat.'),
 'travel.visa':v('travel.visa','تَأْشِيرَةُ الْخُرُوجِ','taʾsyīratu al-khurūji','visa keluar','frasa isim','ch03-travel','يُجَهِّزُ الْمُسَافِرُ التَّأْشِيرَةَ قَبْلَ السَّفَرِ.','Pelancong menyiapkan visa sebelum bepergian.'),
 'travel.apartment':v('travel.apartment','شَقَّةٌ','syaqqatun','apartemen','isim','ch03-travel','ذَهَبْنَا إِلَى الشَّقَّةِ بَعْدَ الْمَطَارِ.','Kami pergi ke apartemen setelah dari bandara.'),
 'travel.tired':v('travel.tired','تَعَبٌ','taʿabun','lelah','isim','ch03-travel','شَعَرَ فَاتِحٌ بِالتَّعَبِ بَعْدَ السَّفَرِ.','Fatih merasa lelah setelah perjalanan.'),
 'hajj.kaaba':v('hajj.kaaba','الْكَعْبَةُ','al-kaʿbatu','Ka’bah','isim','ch04-hajj-umrah','طُفْنَا حَوْلَ الْكَعْبَةِ سَبْعَةَ أَشْوَاطٍ.','Kami tawaf mengelilingi Ka’bah tujuh putaran.'),
 'hajj.ihram':v('hajj.ihram','لِبَاسُ الْإِحْرَامِ','libāsu al-iḥrāmi','pakaian ihram','frasa isim','ch04-hajj-umrah','لَبِسْنَا ثِيَابَ الْإِحْرَامِ فِي الْمِيقَاتِ.','Kami memakai pakaian ihram di miqat.'),
 'hajj.pilgrim':v('hajj.pilgrim','حُجَّاجٌ','ḥujjājun','para jamaah haji','isim jamak','ch04-hajj-umrah','وَصَلَ الْحُجَّاجُ إِلَى مَكَّةَ.','Para jamaah haji tiba di Makkah.'),
 'hajj.tawaf':v('hajj.tawaf','طَوَافٌ','ṭawāfun','tawaf','isim','ch04-hajj-umrah','طَافَ سَالِمٌ حَوْلَ الْكَعْبَةِ.','Salim melakukan tawaf mengelilingi Ka’bah.'),
 'hajj.sai':v('hajj.sai','سَعْيٌ','saʿyun','sa’i','isim','ch04-hajj-umrah','سَعَيْنَا بَيْنَ الصَّفَا وَالْمَرْوَةِ.','Kami melakukan sa’i antara Safa dan Marwah.'),
 'hajj.jamarat':v('hajj.jamarat','الْجَمَرَاتُ','al-jamarātu','Jamarat','isim jamak','ch04-hajj-umrah','رَمَتْ زَهْرَةُ الْجَمَرَاتِ.','Zahra melempar jumrah.'),
 'hajj.madinah':v('hajj.madinah','الْمَدِينَةُ','al-madīnatu','Madinah','isim','ch04-hajj-umrah','غَادَرْنَا إِلَى الْمَدِينَةِ بَعْدَ أَدَاءِ الْعُمْرَةِ.','Kami berangkat ke Madinah setelah umrah.'),
 'hajj.makkah':v('hajj.makkah','مَكَّةُ الْمُكَرَّمَةُ','Makkatu al-mukarramatu','Makkah al-Mukarramah','nama tempat','ch04-hajj-umrah','سَافَرْتُ مَعَ أُسْرَتِي إِلَى مَكَّةَ الْمُكَرَّمَةِ.','Saya bepergian bersama keluarga ke Makkah.'),
 'hajj.mina':v('hajj.mina','مِنَى','Minā','Mina','nama tempat','ch04-hajj-umrah','ذَبَحْتُ الْهَدْيَ فِي مِنَى.','Saya menyembelih hadyu di Mina.'),
 'hajj.passport':v('hajj.passport','جَوَازُ السَّفَرِ','jawāzu as-safari','paspor','frasa isim','ch04-hajj-umrah','يَحْمِلُ الْحَاجُّ جَوَازَ السَّفَرِ.','Jamaah haji membawa paspor.'),
 'hajj.suitcase':v('hajj.suitcase','حَقِيبَةٌ','ḥaqībatun','koper','isim','ch04-hajj-umrah','يَضَعُ الْحَاجُّ مَلَابِسَهُ فِي الْحَقِيبَةِ.','Jamaah haji meletakkan pakaian di dalam koper.'),
 'hajj.guidebook':v('hajj.guidebook','دَلِيلُ الْحَجِّ','dalīlu al-ḥajji','buku panduan haji','frasa isim','ch04-hajj-umrah','يَقْرَأُ الْحَاجُّ دَلِيلَ الْحَجِّ.','Jamaah haji membaca buku panduan haji.'),
 'hajj.prayer_mat':v('hajj.prayer_mat','سَجَّادَةُ الصَّلَاةِ','sajjādatu aṣ-ṣalāti','sajadah','frasa isim','ch04-hajj-umrah','يَفْرُشُ الْحَاجُّ سَجَّادَةَ الصَّلَاةِ.','Jamaah haji menggelar sajadah.'),
 'hajj.arafah':v('hajj.arafah','عَرَفَةُ','ʿArafatu','Arafah','nama tempat','ch04-hajj-umrah','وَقَفْتُ فِي جَبَلِ عَرَفَةَ.','Saya wukuf di Jabal Arafah.'),
 'ict.screen':v('ict.screen','شَاشَةُ الْحَاسُوبِ','syāsyatu al-ḥāsūbi','layar komputer','frasa isim','ch05-ict','تَظْهَرُ الْمَعْلُومَاتُ عَلَى شَاشَةِ الْحَاسُوبِ.','Informasi muncul pada layar komputer.'),
 'ict.keyboard':v('ict.keyboard','لَوْحَةُ مَفَاتِيحِ التَّرْمِيزِ','lawḥatu mafātīḥi at-tarmīzi','papan ketik','frasa isim','ch05-ict','يَكْتُبُ الطَّالِبُ بِاسْتِخْدَامِ لَوْحَةِ الْمَفَاتِيحِ.','Siswa mengetik menggunakan papan ketik.'),
 'ict.mouse':v('ict.mouse','الْفَأْرَةُ','al-faʾratu','mouse komputer','isim','ch05-ict','يَسْتَخْدِمُ الطَّالِبُ الْفَأْرَةَ لِفَتْحِ الْمَلَفِّ.','Siswa menggunakan mouse untuk membuka file.'),
 'ict.laptop':v('ict.laptop','حَاسُوبٌ مَحْمُولٌ','ḥāsūbun maḥmūlun','laptop','frasa isim','ch05-ict','يَسْتَخْدِمُ النَّاسُ الْحَاسُوبَ الْمَحْمُولَ فِي عَمَلِهِمْ.','Orang-orang menggunakan laptop dalam pekerjaan.'),
 'ict.wifi':v('ict.wifi','وَايْ فَايْ','wāy fāy','Wi-Fi','istilah','ch05-ict','يَسْتَخْدِمُ الطُّلَّابُ وَايْ فَايْ لِلِاتِّصَالِ.','Para siswa menggunakan Wi-Fi untuk terhubung.'),
 'ict.download':v('ict.download','تَحْمِيلٌ','taḥmīlun','unduh/unduhan','isim','ch05-ict','يَحْتَاجُ الطَّالِبُ إِلَى تَحْمِيلِ الْمَلَفِّ.','Siswa perlu mengunduh file.'),
 'ict.app':v('ict.app','تَطْبِيقَاتٌ','taṭbīqātun','aplikasi-aplikasi','isim jamak','ch05-ict','يَحْمِلُ الْجَوَّالُ الذَّكِيُّ كَثِيرًا مِنَ التَّطْبِيقَاتِ.','Ponsel pintar memiliki banyak aplikasi.'),
 'ict.whatsapp':v('ict.whatsapp','وَاتْسَاب','wātsāb','WhatsApp','nama aplikasi','ch05-ict','يُسْتَخْدَمُ وَاتْسَابُ لِلتَّوَاصُلِ.','WhatsApp digunakan untuk berkomunikasi.'),
 'ict.internet':v('ict.internet','الْإِنْتِرْنِتُ','al-intirnitu','internet','isim','ch05-ict','يُسَاعِدُ الْإِنْتِرْنِتُ فِي التَّعْلِيمِ وَالتَّعَلُّمِ.','Internet membantu pendidikan dan pembelajaran.'),
 'ict.addiction':v('ict.addiction','إِدْمَانٌ','idmānun','kecanduan','isim','ch05-ict','قَدْ تُسَبِّبُ الْأَلْعَابُ الْإِلِكْتِرُونِيَّةُ الْإِدْمَانَ.','Permainan elektronik dapat menyebabkan kecanduan.'),
 'ict.thesis':v('ict.thesis','الْقَضِيَّةُ','al-qaḍiyyatu','tesis/pernyataan pendapat','isim','ch05-ict','الْقَضِيَّةُ مِنْ عَنَاصِرِ النَّصِّ الْبُرْهَانِيِّ.','Tesis adalah unsur teks eksposisi.'),
 'religion.religion':v('religion.religion','دِينٌ','dīnun','agama','isim','ch06-religions','الدِّينُ مَجْمُوعَةٌ مِنَ الْقَوَاعِدِ.','Agama adalah sekumpulan aturan.'),
 'religion.islam':v('religion.islam','الْإِسْلَامُ','al-islāmu','Islam','nama agama','ch06-religions','الْإِسْلَامُ دِينٌ فِي إِنْدُونِيسِيَا.','Islam adalah agama di Indonesia.'),
 'religion.protestant':v('religion.protestant','الْبَرُوتِسْتَانْتِيَّةُ','al-barūtistāntiyyatu','Protestan','nama agama','ch06-religions','يَتَعَبَّدُ الْمَسِيحِيُّونَ فِي الْكَنِيسَةِ.','Umat Kristiani beribadah di gereja.'),
 'religion.catholic':v('religion.catholic','الْكَاثُولِيكِيَّةُ','al-kātsūlīkiyyatu','Katolik','nama agama','ch06-religions','الْكَاثُولِيكِيَّةُ مِنَ الْأَدْيَانِ الْمَذْكُورَةِ فِي النَّصِّ.','Katolik termasuk agama yang disebut dalam teks.'),
 'religion.hindu':v('religion.hindu','الْهِنْدُوسِيَّةُ','al-hindūsiyyatu','Hindu','nama agama','ch06-religions','يَتَعَبَّدُ الْهِنْدُوسِيُّونَ فِي الْمَعْبَدِ.','Umat Hindu beribadah di tempat ibadah.'),
 'religion.buddhist':v('religion.buddhist','الْبُوذِيَّةُ','al-būdhiyyatu','Buddha','nama agama','ch06-religions','يَتَعَبَّدُ الْبُوذِيُّونَ فِي الْمَعْبَدِ.','Umat Buddha beribadah di tempat ibadah.'),
 'religion.confucian':v('religion.confucian','كُونْفُوشِيُوسِيَّةٌ','kūnfūsyūsiyyatun','Konghucu','nama agama','ch06-religions','كُونْفُوشِيُوسِيَّةٌ مِنَ الْأَدْيَانِ الْمَذْكُورَةِ فِي النَّصِّ.','Konghucu termasuk agama yang disebut dalam teks.'),
 'religion.mosque':v('religion.mosque','مَسْجِدٌ','masjidun','masjid','isim','ch06-religions','يُصَلِّي الْمُسْلِمُونَ فِي الْمَسَاجِدِ.','Umat Islam salat di masjid-masjid.'),
 'religion.church':v('religion.church','كَنِيسَةٌ','kanīsatun','gereja','isim','ch06-religions','يَتَعَبَّدُ الْمَسِيحِيُّونَ فِي الْكَنِيسَةِ.','Umat Kristiani beribadah di gereja.'),
 'religion.temple':v('religion.temple','مَعْبَدٌ','maʿbadun','tempat ibadah/kuil','isim','ch06-religions','يَتَعَبَّدُ الْهِنْدُوسِيُّونَ وَالْبُوذِيُّونَ فِي الْمَعْبَدِ.','Umat Hindu dan Buddha beribadah di tempat ibadah.'),
 'religion.tolerance':v('religion.tolerance','التَّسَامُحُ','at-tasāmuḥu','toleransi','isim','ch06-religions','التَّسَامُحُ مُهِمٌّ فِي الْحَيَاةِ الْمُجْتَمَعِيَّةِ.','Toleransi penting dalam kehidupan bermasyarakat.')
};


export const CASES_CONFIG = {
 'ch01-shopping': {
  contentVersion:'2.0.0',
  caseInfo:{id:'ch01-shopping',number:'01',title:'Audit Transaksi Pasar',location:'Pasar tradisional dan pusat perbelanjaan',description:'Lembar rekap barang dan harga tidak berada di tempat penyimpanan yang semestinya.',briefing:['Petugas pasar menemukan rekap belanja yang belum selesai diperiksa.','Temukan petunjuk tentang barang, timbangan, dan harga.','Susun kalimat deskriptif dan tentukan siapa yang memindahkan lembar rekap.']},
  curriculum:{semester:'Ganjil',chapter:1,level:'MA Kelas XI',focus:'التسوق — pasar tradisional dan pusat perbelanjaan; mendeskripsikan bentuk, timbangan, sifat, dan karakteristik benda.',textGenre:'النص الوصفي — teks deskriptif: الوصف العام dan الوصف الخاص.',grammar:'عدد ألف ومليون ومليار وبليون — bilangan ribuan, jutaan, miliaran, dan triliunan dalam penggunaan Adad-Ma’dud.',sourcePages:'1–15',coreVocabIds:['shop.market','shop.supermarket','shop.buyer','shop.vegetables','shop.fruits','shop.meat','shop.scale','shop.price','shop.discount','shop.fresh','shop.sugar','shop.oil']},
  unlock:{prerequisites:[],minMastery:70},sceneType:'shopping',
  evidence:[
   ev('price','shop.price','ثَمَنٌ / سِعْرٌ','thamanun / siʿrun','harga','🧾','Label harga pada rak membantu pembeli membandingkan harga barang sebelum bertransaksi.','Periksa kartu harga yang tergantung di bagian atas rak pasar.',{left:12,top:8,width:8,height:12}),
   ev('scale','shop.scale','مِيزَانٌ','mīzānun','timbangan','⚖️','Timbangan digunakan pedagang untuk menentukan berat barang sebelum menghitung harga.','Cari timbangan logam dengan piringan bundar di sisi kiri tengah.',{left:27,top:44,width:12,height:20}),
   ev('vegetables','shop.vegetables','خَضْرَوَاتٌ','khaḍrawātun','sayur-sayuran','🥬','Sayuran segar tersusun dalam keranjang pada lapak bagian depan.','Amati tumpukan sayuran hijau di sudut kiri bawah.',{left:13,top:66,width:22,height:27}),
   ev('discount','shop.fruits','فَوَاكِهُ','fawākihu','buah-buahan','🍎','Berbagai buah dan hasil kebun tersusun di lapak dekat timbangan.','Cari tumpukan buah berwarna merah dan jingga di bagian tengah.',{left:39,top:55,width:22,height:23}),
   ev('buyer','shop.buyer','الْمُشْتَرِي','al-musytarī','pembeli','🛒','Pembeli memilih barang dan membawa keranjang belanja sebelum membayar.','Amati pembeli yang berdiri di depan lapak sayuran.',{left:56,top:48,width:16,height:35})
  ],
  puzzle:{pieces:[piece('p1','سِعْرُ اللَّحْمِ','siʿru al-laḥmi','harga daging'),piece('p2','مِائَةُ أَلْفِ رُوبِيَّةٍ','miʾatu alfi rūbiyyatin','seratus ribu rupiah'),piece('p3','لِلْكِيلُو','lil-kīlū','untuk setiap kilogram'),piece('p4','الْوَاحِدِ','al-wāḥidi','satu')],initialOrder:['p3','p4','p1','p2'],acceptedOrders:[['p1','p2','p3','p4']],fullTranslation:'Harga daging seratus ribu rupiah untuk satu kilogram.',grammarNote:'Contoh harga dan ukuran mengikuti bacaan Bab 1. Bab ini membahas kesesuaian Adad dan Ma’dud menurut kelompok bilangan.'},
  suspects:[suspect('nabil','Nabil','نَبِيلٌ','Petugas penimbangan','Mengatakan lembar rekap sudah diserahkan ke kasir.','Catatan timbang menunjukkan ia membawa map ke rak pakaian.',true,'NA'),suspect('salma','Salma','سَلْمَى','Kasir','Mengatakan lembar harga tetap berada di meja kasir.','Catatan pembayaran cocok dengan keterangannya.',false,'SA'),suspect('umar','Umar','عُمَرُ','Petugas rak buah','Mengatakan sedang menata buah dan sayuran.','Daftar stok menunjukkan ia berada di area buah.',false,'UM')],
  storyHook:'Di bagian bawah rekap terdapat tanda bulan sabit dan kode kunjungan klinik. Arsip berikutnya akan diperiksa pada Bab 2.',
  learningPath:L('ch01-shopping',[
   S('ch01-shopping','istima','Istima’ — Menyimak','الاستماع','Mengidentifikasi kosakata dan informasi lisan tentang pasar, barang, dan harga.','3–4','Dengarkan mufradat dan dialog belanja. Fokus pada nama barang, kegiatan membeli, harga, dan jumlah.',['shop.market','shop.supermarket','shop.buyer','shop.vegetables','shop.fruits'],[],[
    ['listen-repeat','Dengarkan dan ulangi خَضْرَوَاتٌ.','Ucapkan خَضْرَوَاتٌ dengan harakat tepat.','Kata tersebut berarti sayur-sayuran.','Perhatikan bunyi خَضْرَ di awal kata.'],
    ['audio-image-match','Pilih gambar yang sesuai dengan audio الْمُشْتَرِي.','Gambar pembeli.','الْمُشْتَرِي berarti pembeli.','Cari orang yang sedang membeli barang.'],
    ['listening-detail','Barang apa yang dibeli dalam keadaan segar menurut audio?','Sayur-sayuran.','Teks menyebut الْخَضْرَوَاتُ الطَّازَجَةُ.','Dengarkan kata setelah يَشْتَرِي الزَّبُونُ.'],
    ['true-false-audio','Tentukan benar/salah: pusat perbelanjaan memiliki beberapa bagian.','Benar.','Bacaan menyebut bagian sayuran, makanan, dan pakaian.','Cari ungkapan فِيهِ أَقْسَامٌ مُتَعَدِّدَةٌ.'],
    ['dictation','Tuliskan kosakata yang terdengar untuk “harga”.','ثَمَنٌ atau سِعْرٌ.','Keduanya digunakan untuk menyatakan harga.','Dengarkan kata pada konteks pembayaran.']
   ]),
   S('ch01-shopping','qiraah','Qira’ah — Membaca','القراءة','Memahami gagasan, fakta, dan struktur teks deskriptif tentang pusat perbelanjaan.','5–6','Bacaan menjelaskan tempat, bagian-bagian, kebersihan, barang yang dijual, dan harga berdasarkan berat atau ukuran. Struktur: deskripsi umum dan deskripsi khusus.',['shop.supermarket','shop.vegetables','shop.fruits','shop.meat','shop.sugar','shop.oil'],[],[
    ['identify-main-idea','Tentukan gagasan umum paragraf tentang الْمُجَمَّعُ التِّجَارِيُّ.','Tempat penjualan kebutuhan sehari-hari dengan beberapa bagian.','Kalimat awal memberi definisi umum pusat perbelanjaan.','Baca kalimat pembuka teks.'],
    ['text-structure','Rincian bagian sayuran, makanan, dan pakaian termasuk ...','الوَصْفُ الْخَاصُّ.','Rincian bagian merupakan deskripsi khusus.','Bedakan pengenalan tempat dan rincian tempat.'],
    ['fact-finding','Menurut bacaan, harga daging dihitung berdasarkan apa?','Berat, misalnya per kilogram.','Teks menyebut harga setiap barang berdasarkan berat.','Temukan kata حَسَبَ الْوَزْنِ.'],
    ['vocabulary-in-context','Apa arti الْمَأْكُولَاتِ dalam bacaan?','Makanan.','Kata tersebut menunjuk bagian makanan.','Kaitkan dengan gula, minyak, teh, kopi, dan susu.'],
    ['compare-information','Apa ciri transaksi pusat perbelanjaan menurut teks?','Pembeli melihat harga dan membayar ke kasir tanpa tawar-menawar langsung.','Pernyataan tersebut dijelaskan pada paragraf akhir.','Cari bagian الْمُعَامَلَةُ فِي الْمُجَمَّعِ التِّجَارِيِّ.']
   ]),
   S('ch01-shopping','qawaid','Qawa’id — Adad dan Ma’dud','القاعدة','Memilih bentuk Adad dan Ma’dud sesuai kelompok bilangan pada contoh buku.','7–10','Materi membahas bilangan 1–2, 3–10, 11–99, serta 100, 1.000, jutaan, miliaran, dan triliunan. Untuk 3–10, bentuk bilangan berbeda gender dari Ma’dud dan Ma’dud jamak majrur; untuk 11–99, Ma’dud mufrad mansub; untuk bilangan besar mengikuti pola rangkuman buku.',['shop.price','shop.meat','shop.scale'],[],[
    ['number-classification','Pada ثَلَاثَةُ أَقْلَامٍ, tentukan Adad dan Ma’dud.','ثَلَاثَةُ = Adad; أَقْلَامٍ = Ma’dud.','Adad menyatakan jumlah, Ma’dud adalah benda yang dihitung.','Tandai kata bilangan terlebih dahulu.'],
    ['gender-agreement','Pada bilangan 3–10, bagaimana hubungan gender Adad dan Ma’dud?','Berbeda gender; Ma’dud jamak majrur.','Itulah ketentuan yang dirangkum pada halaman 15.','Ingat contoh أَقْلَامٍ dan مَجَلَّاتٍ.'],
    ['pattern-choice','Pilih pola Ma’dud untuk bilangan 11–99.','Mufrad mansub.','Rangkuman Bab 1 menyatakan Ma’dud 11–99 berupa mufrad mansub.','Bandingkan tabel bilangan 11–99.'],
    ['large-number-reading','أَلْفٌ menunjukkan bilangan ...','Seribu.','أَلْفٌ berarti seribu; مِلْيُونٌ berarti satu juta.','Gunakan daftar bilangan besar.'],
    ['sentence-assembly','Susun ungkapan harga: مِائَةُ أَلْفِ + رُوبِيَّةٍ.','مِائَةُ أَلْفِ رُوبِيَّةٍ.','Ungkapan tersebut menyatakan seratus ribu rupiah.','Susun bilangan sebelum satuan mata uang.']
   ]),
   S('ch01-shopping','kitabah','Kitabah — Menulis','الكتابة','Menyalin kosakata, melengkapi Adad-Ma’dud, dan menyusun paragraf deskriptif berdasarkan contoh buku.','11–12','Latihan buku mencakup menyalin kosakata yang didengar, menyalin bilangan dan Ma’dud, membuat kalimat dari bilangan, dan menyusun paragraf deskriptif.',['shop.price','shop.meat','shop.fruits','shop.vegetables','shop.sugar'],[],[
    ['copy-vocabulary','Salin kosakata Arab untuk “buah-buahan”.','فَوَاكِهُ.','فَوَاكِهُ berarti buah-buahan.','Gunakan daftar mufradat Bab 1.'],
    ['complete-number','Lengkapi ungkapan مِائَةُ أَلْفِ ... untuk menyatakan rupiah.','رُوبِيَّةٍ.','Satuan mata uang mengikuti contoh buku.','Lihat contoh harga pada bacaan.'],
    ['reorder-words','Susun يَشْتَرِي / الزَّبُونُ / الْخَضْرَوَاتِ.','يَشْتَرِي الزَّبُونُ الْخَضْرَوَاتِ.','Kalimat berarti pembeli membeli sayuran.','Mulai dengan fi’il, lalu fa’il dan objek.'],
    ['paragraph-order','Susun deskripsi: definisi tempat → bagian-bagian → contoh barang/harga.','الوصف العام lalu الوصف الخاص.','Teks deskriptif dimulai dengan deskripsi umum lalu rincian khusus.','Gunakan dua unsur struktur teks.'],
    ['guided-description','Tulis dua kalimat tentang barang, sifat, dan harganya.','Rubrik: kosakata, susunan kalimat, dan Adad-Ma’dud.','Jawaban dinilai dengan rubrik, bukan satu kalimat baku.','Gunakan طَازَجٌ، سِعْرٌ، مِيزَانٌ dan pola bilangan dari buku.']
   ],{criteria:['Ketepatan kosakata Bab 1','Susunan kalimat deskriptif','Ketepatan pola Adad-Ma’dud','Keterbacaan tulisan Arab']}),
   S('ch01-shopping','kalam','Kalam — Berbicara','الكلام','Mempraktikkan tindak tutur bertanya dan menjawab tentang barang, sifat, timbangan, serta harga.','13–14','Contoh dialog buku memperagakan pembeli menanyakan barang dan harga, lalu penjual menjelaskan harga. Praktik berpasangan menggunakan gambar.',['shop.buyer','shop.price','shop.scale','shop.vegetables','shop.fruits'],[],[
    ['pronunciation','Ucapkan ثَمَنٌ dan مِيزَانٌ dengan jelas.','Pelafalan dua kosakata sesuai harakat.','Pelafalan dinilai dari kejelasan bunyi dan harakat.','Dengarkan audio atau minta guru memberi contoh.'],
    ['roleplay-buyer','Berperan sebagai pembeli dan tanyakan harga barang.','Gunakan بِكَمْ ...؟','Pertanyaan harga mengikuti model dialog buku.','Mulai dengan بِكَمْ.'],
    ['roleplay-seller','Jawab pertanyaan harga dengan pola ... بِـ ... رُوبِيَّةٍ.','Sebut barang dan jumlah harga secara jelas.','Penjual menyampaikan harga dan satuan.','Gunakan contoh harga pada halaman 13.'],
    ['object-description','Deskripsikan satu barang: nama, sifat, dan berat/harganya.','Rubrik: nama benda, sifat, dan informasi timbangan/harga.','Tindak tutur harus menggambarkan karakteristik benda.','Pilih satu barang pada daftar kosakata.'],
    ['pair-dialogue','Lakukan dialog pembeli-penjual minimal empat giliran.','Rubrik: pembukaan, pertanyaan barang/harga, jawaban, penutup.','Percakapan dinilai berdasarkan kesesuaian ungkapan.','Gunakan model dialog halaman 13–14.']
   ],{criteria:['Kejelasan pelafalan','Ketepatan tindak tutur','Kosakata belanja','Ketepatan bilangan dan harga']}),
   S('ch01-shopping','mission','Misi Akhir — Audit Transaksi Pasar','مَهَمَّةُ التَّحَقُّقِ','Mengintegrasikan kosakata, pemahaman teks, Adad-Ma’dud, tulisan, dan dialog untuk menuntaskan berkas transaksi.','1–15','Konteks game: rekap belanja berpindah dari meja timbang ke rak pakaian. Cerita ini dibuat untuk permainan; materi bahasa tetap bersumber dari Bab 1.',['shop.price','shop.scale','shop.buyer','shop.vegetables','shop.discount'],[],missionTasks('ch01-shopping',[
    ['Temukan lembar harga dan timbangan pada TKP.','Lembar harga dan timbangan ditemukan.','Kedua petunjuk berkaitan dengan harga berdasarkan berat.','Cari area kasir dan penimbangan.'],
    ['Cocokkan petunjuk dengan kosakata belanja.','Harga, timbangan, sayuran, diskon, pembeli.','Semua kosakata berasal dari daftar mufradat Bab 1.','Gunakan registry kosakata Bab 1.'],
    ['Urutkan catatan transaksi dari barang, jumlah, lalu harga.','Barang → jumlah → harga.','Informasi transaksi lebih mudah diperiksa bila disusun runtut.','Periksa bilangan dan satuan.'],
    ['Pilih susunan Adad-Ma’dud yang tepat dari contoh Bab 1.','Ikuti pola bilangan pada halaman 7–10.','Perhatikan gender dan bentuk Ma’dud.','Tentukan kelompok bilangan dahulu.'],
    ['Jelaskan secara lisan mengapa rekap berada di rak pakaian.','Rubrik: penjelasan berbasis petunjuk dan kosakata belanja.','Kesimpulan harus merujuk bukti, bukan tebakan.','Bandingkan label diskon dan keterangan petugas.']
   ]))
  ]),
  mastery:[
   q('s1','vocabulary','Apa arti الْمُشْتَرِي?',['Pembeli','Penjual','Timbangan','Diskon'],0,'الْمُشْتَرِي berarti pembeli.','shop.buyer'),
   q('s2','vocabulary','خَضْرَوَاتٌ berarti ...',['Sayur-sayuran','Buah-buahan','Daging','Minyak'],0,'خَضْرَوَاتٌ berarti sayur-sayuran.','shop.vegetables',true),
   q('s3','reading','Apa fungsi sosial teks deskriptif Bab 1?',['Memberi informasi rinci mengenai tempat atau benda','Menceritakan pengalaman masa lalu','Memberi langkah prosedur','Menyampaikan argumen'],0,'Teks deskriptif menggambarkan sesuatu secara rinci.'),
   q('s4','reading','Apa dua struktur umum teks deskriptif?',['الْوَصْفُ الْعَامُّ dan الْوَصْفُ الْخَاصُّ','الْهَدَفُ dan الْخُطُوَاتُ','الْقَضِيَّةُ dan الْحُجَجُ','الِاتِّجَاهَاتُ dan الْأَحْدَاثُ'],0,'Struktur teks deskriptif terdiri dari deskripsi umum dan khusus.'),
   q('s5','grammar','Untuk bilangan 3–10, Ma’dud berbentuk ...',['Jamak majrur','Mufrad mansub','Mufrad marfu’','Mutsanna mansub'],0,'Rangkuman Bab 1 menetapkan Ma’dud jamak majrur untuk 3–10.'),
   q('s6','grammar','Untuk bilangan 11–99, Ma’dud berbentuk ...',['Mufrad mansub','Jamak majrur','Mutsanna','Jamak marfu’'],0,'Ma’dud bilangan 11–99 berbentuk mufrad mansub.'),
   q('s7','vocabulary','Apa arti مِيزَانٌ?',['Timbangan','Harga','Diskon','Antrian'],0,'مِيزَانٌ berarti timbangan.','shop.scale',true),
   q('s8','reading','Pusat perbelanjaan memiliki bagian ...',['Sayuran, makanan, dan pakaian','Buku, alat tulis, dan arsip','Obat, pemeriksaan, dan rawat inap','Bandara, hotel, dan pantai'],0,'Bacaan menyebut tiga bagian tersebut.'),
   q('s9','grammar','أَلْفٌ berarti ...',['Seribu','Sejuta','Semiliar','Setriliun'],0,'أَلْفٌ berarti seribu.'),
   q('s10','vocabulary','طَازَجٌ berarti ...',['Segar','Murah','Mahal','Bersih'],0,'طَازَجٌ berarti segar.','shop.fresh',true)
  ]
 },
 'ch02-health': {
  contentVersion:'2.0.0',
  caseInfo:{id:'ch02-health',number:'02',title:'Berkas Kunjungan Klinik',location:'Rumah sakit dan apotek',description:'Lembar prosedur kunjungan pasien ditemukan terpisah dari berkas pendaftaran.',briefing:['Petugas menemukan lembar prosedur pemeriksaan tidak berada di map pendaftaran.','Periksa petunjuk tentang kondisi pasien, fasilitas, dan urutan pemeriksaan.','Gunakan kosakata kesehatan serta Huruf Jar dan Huruf ‘Athaf untuk menyusun informasi.']},
  curriculum:{semester:'Ganjil',chapter:2,level:'MA Kelas XI',focus:'الصحة — rumah sakit, apotek, menjenguk orang sakit; menanyakan kondisi dan memberi saran.',textGenre:'النص الإرشادي — teks prosedur: tujuan, materi, langkah-langkah.',grammar:'حروف الجر وحروف العطف — huruf jar dan huruf ‘athaf.',sourcePages:'16–33',coreVocabIds:['health.hospital','health.pharmacy','health.fever','health.headache','health.chest','health.thermometer','health.prescription','health.nurse','health.medicine','health.throat','health.bloodpressure']},
  unlock:{prerequisites:['ch01-shopping'],minMastery:70},sceneType:'health',
  evidence:[
   ev('thermometer','health.thermometer','مِقْيَاسُ الْحَرَارَةِ','miqyāsu al-ḥarārati','termometer','🌡️','Termometer digital membantu petugas memeriksa suhu tubuh pasien.','Periksa alat ukur putih di meja peralatan bagian depan.',{left:36,top:82,width:10,height:10}),
   ev('prescription','health.prescription','وَصْفَةٌ طِبِّيَّةٌ','waṣfatun ṭibbiyyatun','resep dokter','📄','Dokter mencatat hasil pemeriksaan dan instruksi obat pada lembar resep.','Lihat lembar resep di papan tulis kecil bagian kanan bawah.',{left:84,top:86,width:18,height:13}),
   ev('hospital','health.hospital','مُسْتَشْفًى','mustasyfan','rumah sakit','🏥','Tempat tidur pasien dan peralatan medis menunjukkan area perawatan rumah sakit.','Amati tempat tidur pasien di sisi kiri ruangan.',{left:21,top:49,width:23,height:31}),
   ev('medicine','health.medicine','دَوَاءٌ','dawāʾun','obat','💊','Botol dan kemasan obat tersusun pada meja peralatan medis.','Cari kumpulan botol obat di bagian depan kanan.',{left:67,top:77,width:18,height:22}),
   ev('nurse','health.nurse','مُمَرِّضَةٌ','mumarriḍatun','perawat','🩺','Perawat memeriksa catatan pasien dan membantu dokter selama pemeriksaan.','Cari petugas berseragam biru dengan kerudung di tengah ruangan.',{left:55,top:28,width:14,height:34})
  ],
  puzzle:{pieces:[piece('p1','ذَهَبَ مُحَمَّدٌ','dhahaba Muḥammadun','Muhammad pergi'),piece('p2','إِلَى','ilā','ke'),piece('p3','الْمُسْتَشْفَى','al-mustasyfā','rumah sakit'),piece('p4','لِلْفَحْصِ','lil-faḥṣi','untuk pemeriksaan')],initialOrder:['p3','p1','p4','p2'],acceptedOrders:[['p1','p2','p3','p4']],fullTranslation:'Muhammad pergi ke rumah sakit untuk pemeriksaan.',grammarNote:'إِلَى adalah huruf jar. Isim sesudah huruf jar menjadi majrur. Bab 2 juga mempelajari huruf ‘athaf sebagai penghubung.'},
  suspects:[suspect('huda','Huda','هُدَى','Perawat pendaftaran','Mengatakan berkas sudah diserahkan ke meja dokter.','Catatan pemanggilan menunjukkan ia memindahkan map ke meja informasi.',true,'HU'),suspect('salim','Salim','سَالِمٌ','Petugas apotek','Mengatakan sedang menyiapkan obat berdasarkan resep.','Catatan apotek cocok dengan waktu pemberian resep.',false,'SA'),suspect('amin','Amin','أَمِينٌ','Petugas laboratorium','Mengatakan tidak membawa dokumen keluar dari ruang pemeriksaan.','Daftar alat menunjukkan ia sedang memeriksa alat kesehatan.',false,'AM')],
  storyHook:'Di balik lembar prosedur terdapat kartu perjalanan dengan tanggal keberangkatan. Kartu itu menjadi petunjuk awal Bab 3.',
  learningPath:L('ch02-health',[
   S('ch02-health','istima','Istima’ — Menyimak','الاستماع','Mengenali kosakata bagian tubuh, gejala, fasilitas kesehatan, dan informasi dari percakapan pasien-dokter.','18–19','Materi menyimak memuat kosakata kesehatan dan dialog di rumah, meja penerimaan, serta ruang dokter.',['health.hospital','health.pharmacy','health.fever','health.headache','health.chest','health.thermometer'],[],[
    ['listen-repeat','Dengarkan dan ulangi مِقْيَاسُ الْحَرَارَةِ.','مِقْيَاسُ الْحَرَارَةِ.','Artinya termometer.','Dengarkan per suku kata.'],
    ['audio-image-match','Pilih gambar yang sesuai dengan صُدَاعٌ.','Gambar orang sakit kepala.','صُدَاعٌ berarti sakit kepala.','Cari orang memegang kepala.'],
    ['listening-detail','Alat apa yang digunakan ayah untuk mengukur suhu?','مِقْيَاسُ الْحَرَارَةِ.','Ayah mengukur suhu dengan termometer.','Dengarkan دَعْنِي أَقِسْ حَرَارَتَكَ.'],
    ['dialog-comprehension','Ke mana Muhammad diarahkan setelah menjelaskan keluhannya?','Ke dokter spesialis tenggorokan di rumah sakit.','Petugas menyarankan bertemu dokter spesialis.','Dengarkan bagian setelah أَيُّ خِدْمَةٍ؟.'],
    ['dictation','Tuliskan kosakata untuk “resep dokter”.','وَصْفَةٌ طِبِّيَّةٌ.','Frasa tersebut berarti resep dokter.','Dua kata: waṣfah dan ṭibbiyyah.']
   ]),
   S('ch02-health','qiraah','Qira’ah — Membaca','القراءة','Memahami informasi dan fakta dari dialog kesehatan serta teks prosedur.','20–21','Bacaan memuat dialog pasien, petugas rumah sakit, dan dokter. Teks prosedur menjelaskan tujuan, materi, dan langkah-langkah pemeriksaan.',['health.hospital','health.pharmacy','health.prescription','health.nurse','health.medicine','health.throat'],[],[
    ['identify-procedure-goal','Apa tujuan teks prosedur pemeriksaan di rumah sakit?','Memberi petunjuk langkah pemeriksaan agar proses berjalan mudah.','Teks prosedur menjelaskan hasil yang ingin dicapai.','Cari bagian yang menjelaskan alasan petunjuk diberikan.'],
    ['sequence-steps','Urutkan: ambil nomor antrean, registrasi, tunggu panggilan, menuju ruang dokter.','Ambil nomor antrean → registrasi → tunggu panggilan → ruang dokter.','Urutan sesuai dialog petugas penerimaan.','Perhatikan أَوَّلًا، ثَانِيًا، أَخِيرًا.'],
    ['fact-finding','Keluhan Muhammad dalam dialog adalah ...','Demam, sakit kepala, dan nyeri tenggorokan.','Informasi disebut saat pasien menjelaskan kondisinya.','Cari أَشْعُرُ بِارْتِفَاعِ دَرَجَةِ الْحَرَارَةِ.'],
    ['text-structure','Apa tiga unsur teks prosedur menurut buku?','Tujuan, materi, dan langkah-langkah.','Buku menyebut الهَدَف، الْمَادَّة، الْخُطُوَات.','Ingat tiga bagian teks prosedur.'],
    ['comprehension','Apa saran dokter setelah pemeriksaan?','Minum obat tepat waktu, istirahat cukup, menghindari rokok, dan memperbanyak sayur/buah.','Semua saran disebutkan dalam dialog dokter.','Cari daftar nasihat dokter.']
   ]),
   S('ch02-health','qawaid','Qawa’id — Huruf Jar dan Huruf ‘Athaf','القاعدة','Mengidentifikasi huruf jar dan ‘athaf serta menerapkan pengaruhnya pada kata dalam kalimat.','21–27','Huruf jar: مِنْ، عَنْ، إِلَى، كَ، عَلَى، لِـ، فِي، بِـ. Isim sesudah huruf jar menjadi majrur. Huruf ‘athaf: وَ، فَ، ثُمَّ، أَوْ، أَمْ، حَتَّى، لَكِنْ، لَا، بَلْ.',['health.hospital','health.pharmacy','health.medicine','health.prescription'],[],[
    ['identify-preposition','Tentukan huruf jar dalam أَذْهَبُ إِلَى الصَّيْدَلِيَّةِ.','إِلَى.','إِلَى adalah huruf jar bermakna “ke”.','Cari kata yang menghubungkan fi’il dan tempat.'],
    ['case-effect','Apa keadaan isim setelah huruf jar?','Majrur.','Isim yang didahului huruf jar hukumnya majrur.','Periksa harakat akhir isim.'],
    ['conjunction-function','Apa fungsi وَ dalam جَاءَ مُحَمَّدٌ وَعَائِشَةُ?','Menghubungkan dua unsur dengan makna “dan”.','وَ termasuk huruf ‘athaf.','Cari hubungan dua nama.'],
    ['choose-conjunction','Pilih huruf ‘athaf untuk menyatakan “kemudian”.','ثُمَّ.','ثُمَّ berarti kemudian.','Lihat daftar huruf ‘athaf.'],
    ['correct-sentence','Lengkapi أَذْهَبُ ... الْمُسْتَشْفَى dengan makna “ke”.','إِلَى.','إِلَى menyatakan arah tujuan.','Pilih huruf jar yang sesuai makna.']
   ]),
   S('ch02-health','kitabah','Kitabah — Menulis','الكتابة','Menyusun kalimat dan teks prosedur kesehatan dengan urutan logis serta penggunaan huruf jar dan ‘athaf.','28–30','Latihan buku meminta siswa melengkapi ungkapan, menyusun kata menjadi kalimat, mengubah dialog menjadi teks prosedur, dan mengurutkan kalimat.',['health.hospital','health.pharmacy','health.medicine','health.prescription'],[],[
    ['complete-sentence','Lengkapi أَذْهَبُ ... الْمُسْتَشْفَى dengan huruf jar yang berarti “ke”.','إِلَى.','إِلَى menyatakan arah tujuan.','Makna kalimat: pergi ke rumah sakit.'],
    ['reorder-words','Susun ذَهَبَ / مُحَمَّدٌ / إِلَى / الْمُسْتَشْفَى.','ذَهَبَ مُحَمَّدٌ إِلَى الْمُسْتَشْفَى.','Kalimat berarti Muhammad pergi ke rumah sakit.','Mulai dengan fi’il ذَهَبَ.'],
    ['add-conjunction','Hubungkan kegiatan minum obat dan istirahat dengan “kemudian”.','ثُمَّ.','ثُمَّ menghubungkan dua kejadian berurutan.','Gunakan huruf ‘athaf.'],
    ['procedure-order','Susun teks prosedur: tujuan, materi, lalu langkah.','الهَدَف → الْمَادَّة → الْخُطُوَات.','Itulah struktur teks prosedur Bab 2.','Gunakan tiga unsur struktur.'],
    ['guided-procedure','Tulislah tiga langkah pemeriksaan mengikuti petunjuk buku.','Rubrik: urutan, ungkapan, kosakata, huruf penghubung.','Tugas dinilai berdasarkan kelengkapan struktur dan bahasa.','Gunakan أَوَّلًا، ثَانِيًا، أَخِيرًا.']
   ],{criteria:['Kelengkapan struktur prosedur','Urutan langkah','Ketepatan huruf jar/‘athaf','Ejaan Arab']}),
   S('ch02-health','kalam','Kalam — Berbicara','الكلام','Menanyakan kondisi kesehatan, merespons orang sakit, dan memberi saran menggunakan model percakapan buku.','31–32','Contoh dialog memperagakan pertanyaan tentang rasa sakit, jawaban pasien, ungkapan mendoakan, dan saran dokter.',['health.fever','health.headache','health.chest','health.throat','health.medicine'],[],[
    ['pronunciation','Ucapkan صُدَاعٌ، حُمَّى، وَصْفَةٌ طِبِّيَّةٌ.','Pelafalan tiga kosakata kesehatan.','Perhatikan bunyi dan harakat.','Ucapkan perlahan per suku kata.'],
    ['ask-condition','Ajukan pertanyaan “Apa yang kamu rasakan?” sesuai model buku.','بِمَ تَشْعُرُ؟','Pertanyaan dokter untuk mengetahui kondisi pasien.','Mulai dengan بِمَ تَشْعُرُ.'],
    ['respond-symptom','Jawab “Saya merasa sakit kepala”.','أَشْعُرُ بِالصُّدَاعِ.','Ungkapan sesuai kosakata ṣudāʿ.','Gunakan أَشْعُرُ بِـ.'],
    ['give-advice','Berikan satu saran kesehatan yang terdapat dalam dialog dokter.','Minum obat tepat waktu atau istirahat cukup.','Saran harus sesuai isi dialog buku.','Ingat daftar nasihat dokter.'],
    ['roleplay-clinic','Lakukan percakapan dokter-pasien minimal empat giliran.','Rubrik: pertanyaan, keluhan, respons, dan saran.','Penilaian memperhatikan kesesuaian tindak tutur.','Gunakan contoh dialog halaman 22–23.']
   ],{criteria:['Ungkapan bertanya','Respons gejala','Pelafalan kosakata','Kesantunan dan kelancaran']}),
   S('ch02-health','mission','Misi Akhir — Rekonstruksi Berkas Klinik','مَهَمَّةُ الْعِيَادَةِ','Menggabungkan informasi dialog, teks prosedur, dan huruf jar/‘athaf untuk menemukan urutan berkas klinik.','16–33','Konteks game: lembar prosedur terpisah dari map pendaftaran. Cerita merupakan konteks permainan; materi bahasa mengacu pada Bab 2.',['health.hospital','health.pharmacy','health.prescription','health.nurse','health.medicine'],[],missionTasks('ch02-health',[
    ['Temukan termometer, resep, dan map pendaftaran.','Tiga objek ditemukan dan dicatat.','Objek mengarah pada urutan pemeriksaan.','Periksa meja dokter dan penerimaan.'],
    ['Cocokkan gejala pasien dengan kata Arab yang tepat.','Demam, sakit kepala, nyeri dada/tenggorokan sesuai petunjuk.','Kosakata berasal dari daftar mufradat Bab 2.','Gunakan daftar kata kesehatan.'],
    ['Susun urutan kunjungan berdasarkan dialog.','Ambil nomor antrean → registrasi → tunggu panggilan → ruang dokter.','Urutan mengikuti petunjuk petugas.','Cari penanda أَوَّلًا dan ثُمَّ.'],
    ['Lengkapi kalimat lokasi menggunakan huruf jar.','إِلَى الْمُسْتَشْفَى atau فِي الْمُسْتَشْفَى sesuai makna.','Huruf jar membuat isim sesudahnya majrur.','Pilih antara makna “ke” dan “di”.'],
    ['Jelaskan secara lisan urutan kunjungan pasien.','Rubrik: urutan, kosakata, huruf jar/‘athaf, dan kejelasan.','Sampaikan informasi sesuai dialog buku.','Gunakan أَوَّلًا، ثُمَّ، أَخِيرًا.']
   ]))
  ]),
  mastery:[
   q('h1','vocabulary','Apa arti مُسْتَشْفًى?',['Rumah sakit','Apotek','Resep','Perawat'],0,'مُسْتَشْفًى berarti rumah sakit.','health.hospital',true),
   q('h2','vocabulary','وَصْفَةٌ طِبِّيَّةٌ berarti ...',['Resep dokter','Termometer','Tekanan darah','Suntikan'],0,'Frasa tersebut berarti resep dokter.','health.prescription',true),
   q('h3','reading','Teks prosedur menjelaskan ...',['Langkah atau tahapan untuk mencapai tujuan','Pengalaman masa lalu','Deskripsi tempat','Pendapat dengan argumen'],0,'Teks prosedur berisi langkah sistematis.'),
   q('h4','reading','Tiga struktur teks prosedur adalah ...',['Tujuan, materi, langkah-langkah','Orientasi, kejadian, reorientasi','Deskripsi umum, khusus','Tesis, argumen, penguatan'],0,'Struktur tersebut tercantum pada rangkuman Bab 2.'),
   q('h5','grammar','Isim setelah huruf jar berkedudukan ...',['Majrur','Mansub','Marfu’','Majzum'],0,'Huruf jar menyebabkan isim sesudahnya majrur.'),
   q('h6','grammar','Huruf ‘athaf yang berarti “kemudian” adalah ...',['ثُمَّ','فِي','مِنْ','عَنْ'],0,'ثُمَّ berarti kemudian.'),
   q('h7','vocabulary','Apa arti صُدَاعٌ?',['Sakit kepala','Demam','Diare','Batuk'],0,'صُدَاعٌ berarti sakit kepala.','health.headache',true),
   q('h8','grammar','Huruf jar إِلَى berarti ...',['Ke/pada','Di dalam','Dari','Di atas'],0,'إِلَى digunakan untuk makna ke/pada.'),
   q('h9','reading','Siapa yang memberikan resep dalam dialog?',['Dokter','Kasir','Penjaga sekolah','Pembeli'],0,'Dokter memberikan resep setelah pemeriksaan.'),
   q('h10','vocabulary','Apa arti دَوَاءٌ?',['Obat','Klinik','Tenggorokan','Stetoskop'],0,'دَوَاءٌ berarti obat.','health.medicine',true)
  ]
 },

 'ch03-travel': {
  contentVersion:'2.0.0',
  caseInfo:{id:'ch03-travel',number:'03',title:'Jadwal Perjalanan Tertukar',location:'Terminal, bandara, dan pusat informasi wisata',description:'Kartu jadwal perjalanan rombongan tertukar dengan kartu destinasi wisata.',briefing:['Agen perjalanan menerima dua kartu dengan informasi yang tidak cocok.','Periksa kendaraan, tujuan, waktu, dan urutan kejadian dalam bacaan.','Gunakan Isim Nakirah dan Isim Ma’rifah untuk memeriksa keterangan.']},
  curriculum:{semester:'Ganjil',chapter:3,level:'MA Kelas XI',focus:'السفر — sarana perjalanan, destinasi wisata, pengalaman bepergian, berpamitan dan menyambut.',textGenre:'النص السردي التعدادي — teks rekon: orientasi, kejadian, reorientasi.',grammar:'الاسم النكرة والاسم المعرفة — isim umum dan isim tertentu.',sourcePages:'34–54',coreVocabIds:['travel.traveler','travel.passport','travel.suitcase','travel.airport','travel.hotel','travel.beach','travel.airplane','travel.visa','travel.apartment','travel.tired']},
  unlock:{prerequisites:['ch02-health'],minMastery:70},sceneType:'travel',
  evidence:[
   ev('passport','travel.passport','جَوَازُ السَّفَرِ','jawāzu as-safari','paspor','🛂','Paspor dan kartu perjalanan tersimpan bersama dokumen yang dibawa penumpang.','Periksa buku dokumen berwarna merah di meja depan.',{left:43,top:88,width:15,height:11}),
   ev('airport','travel.airport','مَطَارٌ','maṭārun','bandara','✈️','Papan keberangkatan menampilkan jadwal penerbangan dan tujuan penumpang.','Cari papan informasi penerbangan besar di kiri atas.',{left:18,top:12,width:27,height:20}),
   ev('suitcase','travel.suitcase','حَقِيبَةٌ','ḥaqībatun','koper/tas','🧳','Koper penumpang menunggu untuk dibawa menuju area keberangkatan.','Amati koper besar di atas troli bagian tengah kanan.',{left:68,top:66,width:18,height:28}),
   ev('hotel','travel.airplane','طَائِرَةٌ','ṭāʾiratun','pesawat','✈️','Pesawat menunggu penumpang di area landasan dekat terminal.','Lihat pesawat yang tampak melalui jendela besar.',{left:77,top:24,width:20,height:19}),
   ev('beach','travel.traveler','مُسَافِرٌ','musāfirun','orang yang bepergian','🧍','Seorang pelancong membawa ransel dan bersiap menuju gerbang keberangkatan.','Cari penumpang dengan ransel besar di sisi kanan tengah.',{left:78,top:48,width:13,height:30})
  ],
  puzzle:{pieces:[piece('p1','سَافَرَ فَاتِحٌ','sāfara Fātiḥun','Fatih bepergian'),piece('p2','إِلَى إِنْدُونِيسِيَا','ilā Indūnīsiyā','ke Indonesia'),piece('p3','يَوْمَ الْأَحَدِ','yawma al-aḥadi','pada hari Ahad'),piece('p4','بِالطَّائِرَةِ','biṭ-ṭāʾirati','dengan pesawat')],initialOrder:['p3','p4','p1','p2'],acceptedOrders:[['p1','p2','p3','p4']],fullTranslation:'Fatih bepergian ke Indonesia pada hari Ahad dengan pesawat.',grammarNote:'Isim ma’rifah menunjukkan sesuatu yang tertentu; isim nakirah menunjukkan sesuatu yang umum/belum tertentu.'},
  suspects:[suspect('faris','Faris','فَارِسٌ','Petugas jadwal perjalanan','Mengatakan sudah menyusun jadwal keberangkatan.','Catatan meja menunjukkan ia menukar kartu rute dan destinasi.',true,'FA'),suspect('aisyah','Aisyah','عَائِشَةُ','Pemandu wisata','Mengatakan sedang menunggu rombongan di bandara.','Catatan kedatangan sesuai dengan keterangannya.',false,'AI'),suspect('yusuf','Yusuf','يُوسُفُ','Petugas bagasi','Mengatakan sedang memeriksa koper rombongan.','Daftar bagasi mendukung keterangannya.',false,'YU')],
  storyHook:'Di balik kartu perjalanan terdapat catatan pengalaman umrah dan tanggal keberangkatan. Arsip itu akan diperiksa dalam Bab 4.',
  learningPath:L('ch03-travel',[
   S('ch03-travel','istima','Istima’ — Menyimak','الاستماع','Mengenali kosakata perjalanan dan menangkap informasi kendaraan, tujuan, serta ungkapan selamat jalan/selamat datang.','36–37','Materi menyimak berkaitan dengan kosakata perjalanan, tempat wisata, dan informasi perjalanan.',['travel.traveler','travel.passport','travel.suitcase','travel.airport','travel.airplane'],[],[
    ['listen-repeat','Dengarkan dan ulangi جَوَازُ السَّفَرِ.','جَوَازُ السَّفَرِ.','Artinya paspor.','Perhatikan gabungan jawāz dan as-safar.'],
    ['audio-image-match','Pilih gambar yang sesuai dengan طَائِرَةٌ.','Gambar pesawat.','طَائِرَةٌ berarti pesawat.','Cari kendaraan yang terbang.'],
    ['listening-detail','Dengan kendaraan apa Fatih pergi ke Indonesia?','بِالطَّائِرَةِ.','Teks menyebut Fatih bepergian dengan pesawat.','Dengarkan frasa بِالطَّائِرَةِ.'],
    ['travel-location','Tempat kedatangan pesawat yang disebut dalam bacaan adalah ...','مَطَارُ جُوَانْدَا.','Bacaan menyebut Bandara Juanda di Surabaya.','Cari kata مَطَار.'],
    ['listening-expression','Ungkapan perpisahan yang muncul pada dialog adalah ...','مَعَ السَّلَامَةِ.','Ungkapan ini digunakan saat berpisah.','Perhatikan dialog akhir perjalanan.']
   ]),
   S('ch03-travel','qiraah','Qira’ah — Membaca','القراءة','Menemukan informasi faktual dan urutan peristiwa dalam teks rekon perjalanan.','38–43','Teks rekon menginformasikan pengalaman masa lalu. Struktur: orientasi (orang, tempat, waktu), kejadian berurutan, dan reorientasi/komentar.',['travel.traveler','travel.airport','travel.hotel','travel.beach','travel.apartment'],[],[
    ['identify-orientation','Informasi siapa, kapan, dan ke mana pada awal teks disebut bagian ...','Orientasi / الاتِّجَاهَات.','Orientasi memuat latar orang, waktu, dan tempat.','Baca kalimat pembuka cerita.'],
    ['sequence-events','Urutkan: tiba di Surabaya, menuju Bali, mengunjungi Pantai Kuta.','Tiba di Surabaya → menuju Bali → mengunjungi Pantai Kuta.','Peristiwa disusun sesuai urutan kejadian.','Gunakan penanda waktu pada bacaan.'],
    ['fact-finding','Di mana keluarga Fatih menginap setelah tiba di Bali?','Di hotel.','Bacaan menyatakan mereka tinggal di الفندق.','Cari kata سَكَنُوا.'],
    ['identify-reorientation','Bagian yang menyatakan perasaan/komentar setelah perjalanan disebut ...','Reorientasi / التَّعْلِيق.','Bagian ini berisi komentar atau hasil dari kejadian.','Cari kalimat tentang perasaan Fatih.'],
    ['genre-function','Apa fungsi sosial teks rekon?','Menggambarkan pengalaman masa lalu sesuai urutan kejadian.','Definisi ini tercantum dalam rangkuman Bab 3.','Ingat teks yang menceritakan kembali peristiwa.']
   ]),
   S('ch03-travel','qawaid','Qawa’id — Isim Nakirah dan Ma’rifah','القاعدة','Membedakan isim nakirah dan ma’rifah berdasarkan tanda dan jenisnya dalam teks.','44–46','Isim nakirah menunjukkan makna umum/belum tertentu; biasanya bertanwin dan tidak diawali ال. Isim ma’rifah menunjukkan makna tertentu, termasuk isim ber ال, nama diri, dhamir, isim isyarah, isim maushul, dan mudhaf-mudhaf ilaih.',['travel.traveler','travel.airport','travel.hotel','travel.beach'],[],[
    ['classify-nakirah','Klasifikasikan مَطَارٌ.','Isim nakirah.','Bentuk bertanwin dan tanpa ال menunjukkan makna umum.','Periksa tanwin dan awalan ال.'],
    ['classify-marifah','Klasifikasikan الْمَطَارُ.','Isim ma’rifah.','ال menjadikan isim tersebut tertentu.','Cari awalan ال.'],
    ['marifah-types','أَحْمَدُ termasuk jenis ma’rifah apa?','Isim ‘alam (nama diri).','Nama orang termasuk isim ‘alam.','Perhatikan bahwa أحمد adalah nama orang.'],
    ['pronoun-category','هُوَ termasuk jenis ma’rifah apa?','Dhamir (kata ganti).','Dhamir termasuk kelompok isim ma’rifah.','Ingat kategori isim ma’rifah pada buku.'],
    ['compare-forms','Apa perbedaan مَكَانٌ dan الْمَكَانُ?','Yang pertama umum; yang kedua tempat tertentu.','Nakirah bersifat umum, ma’rifah menunjuk sesuatu tertentu.','Perhatikan ada/tidaknya ال.']
   ]),
   S('ch03-travel','kitabah','Kitabah — Menulis','الكتابة','Menyusun kalimat dan teks rekon perjalanan dengan urutan orientasi, kejadian, dan reorientasi.','47','Latihan menulis meminta siswa melengkapi unsur teks rekon, menyusun kalimat berdasarkan gambar, dan membuat teks mandiri.',['travel.traveler','travel.airport','travel.hotel','travel.beach','travel.tired'],[],[
    ['complete-orientation','Lengkapi orientasi dengan siapa, kapan, dan ke mana perjalanan berlangsung.','Rubrik: tokoh, waktu, tempat.','Orientasi memberi latar sebelum peristiwa.','Gunakan فِي يَوْمِ ... سَافَرْتُ إِلَى ...'],
    ['reorder-words','Susun سَافَرَ / فَاتِحٌ / إِلَى / بَالِي.','سَافَرَ فَاتِحٌ إِلَى بَالِي.','Kalimat berarti Fatih bepergian ke Bali.','Mulai dengan kata kerja lampau.'],
    ['complete-event','Lengkapi kejadian dengan urutan: setelah tiba, kemudian pergi ke hotel.','بَعْدَ أَنْ وَصَلْنَا ... ثُمَّ ذَهَبْنَا ...','Kata penghubung membantu mengurutkan kejadian.','Gunakan بَعْدَ أَنْ dan ثُمَّ.'],
    ['write-reorientation','Tulis satu kalimat komentar tentang pengalaman perjalanan.','Rubrik: kalimat komentar/perasaan dan ketepatan bahasa.','Reorientasi berisi komentar akhir.','Gunakan شَعَرَ atau السُّرُور.'],
    ['write-recount','Buat teks rekon pendek dari tiga gambar perjalanan.','Rubrik: orientasi, urutan kejadian, reorientasi.','Teks rekon mengikuti urutan waktu.','Gunakan kosakata transportasi dan destinasi.']
   ],{criteria:['Kelengkapan orientasi','Urutan kejadian','Reorientasi','Ketepatan kosakata dan struktur']}),
   S('ch03-travel','kalam','Kalam — Berbicara','الكلام','Mempraktikkan ungkapan berpamitan, selamat jalan, menyambut kedatangan, dan menceritakan perjalanan.','48–50','Contoh dialog buku menggunakan ungkapan tentang liburan, tempat wisata, مَعَ السَّلَامَةِ، اللَّهُ يُسَلِّمُكَ.',['travel.traveler','travel.beach','travel.hotel','travel.airport'],[],[
    ['pronunciation','Ucapkan مَعَ السَّلَامَةِ dan اللَّهُ يُسَلِّمُكَ.','Dua ungkapan perpisahan sesuai harakat.','Keduanya muncul pada dialog Bab 3.','Latih dengan jeda antarkata.'],
    ['farewell-dialogue','Praktikkan dialog berpamitan sebelum perjalanan.','Gunakan مَعَ السَّلَامَةِ.','Ungkapan sesuai contoh dialog.','Pilih ungkapan penutup perpisahan.'],
    ['welcome-dialogue','Sambut teman yang baru tiba menggunakan ungkapan yang sesuai.','Rubrik: ungkapan menyambut dan respons.','Tindak tutur harus sesuai konteks kedatangan.','Gunakan salam pembuka yang dipelajari.'],
    ['ask-travel','Tanyakan ke mana teman pergi saat liburan.','إِلَى أَيْنَ سَافَرْتَ؟','Pertanyaan menanyakan tujuan perjalanan.','Gunakan أَيْنَ untuk tempat.'],
    ['tell-trip','Ceritakan perjalanan berdasarkan gambar.','Rubrik: tempat, transportasi, urutan, komentar.','Gunakan kalimat yang merujuk pengalaman masa lalu.','Ikuti struktur teks rekon.']
   ],{criteria:['Ketepatan ungkapan sosial','Pelafalan','Informasi perjalanan','Urutan cerita']}),
   S('ch03-travel','mission','Misi Akhir — Pemulihan Jadwal Perjalanan','مَهَمَّةُ السَّفَرِ','Menggunakan informasi bacaan dan kaidah isim untuk memulihkan kartu jadwal perjalanan.','34–54','Konteks game: kartu jadwal keberangkatan tertukar. Pemain mencocokkan paspor, papan keberangkatan, koper, pesawat, dan pelancong.',['travel.passport','travel.airport','travel.suitcase','travel.airplane','travel.traveler'],[],missionTasks('ch03-travel',[
    ['Temukan paspor, kartu bandara, koper, hotel, dan destinasi.','Lima petunjuk perjalanan ditemukan.','Petunjuk mengidentifikasi urutan dan tujuan perjalanan.','Periksa meja keberangkatan dan bagasi.'],
    ['Cocokkan nama tempat dengan kartu yang sesuai.','مَطَارٌ = bandara; فُنْدُقٌ = hotel; شَاطِئٌ = pantai.','Kosakata mengikuti daftar Bab 3.','Gunakan Kamus Detektif.'],
    ['Susun kronologi perjalanan sesuai bacaan.','Keberangkatan → tiba di bandara → menuju penginapan/destinasi → komentar.','Teks rekon mengikuti urutan kejadian.','Pisahkan orientasi, kejadian, dan komentar.'],
    ['Tandai isim nakirah dan ma’rifah pada kartu.','Klasifikasi berdasarkan ال, nama diri, atau kategori ma’rifah lain.','Kaidah Bab 3 diterapkan pada kata dalam konteks.','Periksa tanwin dan ال.'],
    ['Jelaskan jadwal yang benar secara lisan.','Rubrik: tujuan, transportasi, kronologi, ungkapan perjalanan.','Kesimpulan disampaikan berdasarkan kartu dan teks.','Gunakan إِلَى أَيْنَ dan kata kerja perjalanan.']
   ]))
  ]),
  mastery:[
   q('t1','vocabulary','Apa arti جَوَازُ السَّفَرِ?',['Paspor','Bandara','Hotel','Pantai'],0,'جَوَازُ السَّفَرِ berarti paspor.','travel.passport',true),
   q('t2','vocabulary','فُنْدُقٌ berarti ...',['Hotel','Apartemen','Halte','Piramida'],0,'فُنْدُقٌ berarti hotel.','travel.hotel',true),
   q('t3','reading','Struktur teks rekon adalah ...',['Orientasi, kejadian, reorientasi','Tujuan, materi, langkah','Deskripsi umum, khusus','Tesis, argumen, penguatan'],0,'Teks rekon terdiri dari orientasi, kejadian, dan reorientasi.'),
   q('t4','reading','Orientasi memuat informasi ...',['Siapa, kapan, dan di mana','Harga dan berat','Tujuan, bahan, langkah','Tesis dan argumen'],0,'Orientasi memberi latar tokoh, waktu, dan tempat.'),
   q('t5','grammar','Isim nakirah menunjukkan makna ...',['Umum/belum tertentu','Khusus/tertentu','Kata kerja lampau','Kata sambung'],0,'Isim nakirah menunjukkan sesuatu yang umum.'),
   q('t6','grammar','Isim yang diawali ال biasanya termasuk ...',['Ma’rifah','Nakirah','Fi’il madhi','Huruf jar'],0,'Alif-lam merupakan salah satu penanda isim ma’rifah.'),
   q('t7','vocabulary','Apa arti مَطَارٌ?',['Bandara','Koper','Hotel','Visa'],0,'مَطَارٌ berarti bandara.','travel.airport',true),
   q('t8','grammar','أَحْمَدُ termasuk ...',['Isim ‘alam','Isim isyarah','Isim maushul','Huruf ‘athaf'],0,'Nama diri termasuk kelompok ma’rifah.'),
   q('t9','reading','Apa tujuan sosial teks rekon?',['Menceritakan kembali pengalaman masa lalu secara berurutan','Menjelaskan prosedur','Mendeskripsikan tempat','Meyakinkan dengan argumen'],0,'Teks rekon menggambarkan pengalaman masa lalu.'),
   q('t10','vocabulary','شَاطِئُ الْبَحْرِ berarti ...',['Pantai','Bandara','Hotel','Halte'],0,'Frasa tersebut berarti pantai.','travel.beach',true)
  ]
 },
 'ch04-hajj-umrah': {
  contentVersion:'2.0.0',
  caseInfo:{id:'ch04-hajj-umrah',number:'04',title:'Rekonstruksi Jurnal Perjalanan Ibadah',location:'Pusat informasi perjalanan haji dan umrah',description:'Catatan perjalanan umrah dan haji ditemukan tidak berurutan.',briefing:['Jurnal perjalanan ibadah memuat peristiwa yang belum tersusun kronologis.','Temukan petunjuk tentang miqat, ihram, tawaf, sa’i, dan perjalanan ke Madinah.','Gunakan teks rekon dan tasrif Fi’il Madhi untuk menyusun kembali jurnal.']},
  curriculum:{semester:'Genap',chapter:4,level:'MA Kelas XI',focus:'الحج والعمرة، مكة والمدينة — menyatakan dan menanyakan tindakan/kejadian lampau.',textGenre:'النص السردي التعدادي — teks rekon pengalaman haji dan umrah.',grammar:'تصريف الفعل الماضي اللغوي — perubahan Fi’il Madhi menurut dhamir/pelaku.',sourcePages:'55–71',coreVocabIds:['hajj.kaaba','hajj.ihram','hajj.pilgrim','hajj.tawaf','hajj.sai','hajj.jamarat','hajj.madinah','hajj.makkah','hajj.mina','hajj.arafah']},
  unlock:{prerequisites:['ch03-travel'],minMastery:70},sceneType:'hajj-umrah',
  evidence:[
   ev('ihram','hajj.ihram','لِبَاسُ الْإِحْرَامِ','libāsu al-iḥrāmi','pakaian ihram','🕋','Jamaah menyiapkan kain ihram sebelum berangkat menuju Tanah Suci.','Cari tumpukan kain putih yang terlipat di meja bagian tengah.',{left:52,top:67,width:18,height:18}),
   ev('kaaba','hajj.passport','جَوَازُ السَّفَرِ','jawāzu as-safari','paspor','🛂','Paspor menjadi dokumen perjalanan yang perlu dibawa setiap jamaah.','Periksa buku paspor berwarna merah di meja depan.',{left:42,top:84,width:13,height:13}),
   ev('sai','hajj.suitcase','حَقِيبَةٌ','ḥaqībatun','koper','🧳','Jamaah menyiapkan koper untuk menyimpan pakaian dan perlengkapan perjalanan.','Cari koper besar yang berdiri di sisi kanan depan.',{left:77,top:68,width:17,height:29}),
   ev('arafah','hajj.guidebook','دَلِيلُ الْحَجِّ','dalīlu al-ḥajji','buku panduan haji','📘','Buku panduan membantu jamaah mempelajari urutan kegiatan ibadah haji.','Cari buku panduan berwarna biru di atas meja bagian kanan tengah.',{left:59,top:74,width:15,height:12}),
   ev('madinah','hajj.prayer_mat','سَجَّادَةُ الصَّلَاةِ','sajjādatu aṣ-ṣalāti','sajadah','🕌','Jamaah membawa sajadah sebagai perlengkapan untuk melaksanakan salat.','Cari sajadah hijau bermotif yang terlipat di sudut kanan bawah.',{left:70,top:91,width:18,height:12})
  ],
  puzzle:{pieces:[piece('p1','طَافَ سَالِمٌ','ṭāfa Sālimun','Salim melakukan tawaf'),piece('p2','حَوْلَ الْكَعْبَةِ','ḥawla al-kaʿbati','mengelilingi Ka’bah'),piece('p3','سَبْعَةَ','sabʿata','tujuh'),piece('p4','أَشْوَاطٍ','asywāṭin','putaran')],initialOrder:['p3','p1','p4','p2'],acceptedOrders:[['p1','p2','p3','p4']],fullTranslation:'Salim melakukan tawaf mengelilingi Ka’bah tujuh putaran.',grammarNote:'طَافَ adalah Fi’il Madhi. Bentuk kata kerja lampau berubah mengikuti dhamir, misalnya طَافَ، طَافَتْ، طُفْتُ، طُفْنَا.'},
  suspects:[suspect('amin','Amin','أَمِينٌ','Petugas penyusun jurnal','Mengatakan halaman jurnal sudah ia urutkan sesuai tanggal.','Catatan koreksi menunjukkan ia memindahkan lembar kronologi ke map lain.',true,'AM'),suspect('zahra','Zahra','زَهْرَةُ','Peserta perjalanan','Mengatakan hanya menyerahkan foto kegiatan.','Foto dan tanggalnya sesuai dengan urutan jurnal.',false,'ZA'),suspect('salim','Salim','سَالِمٌ','Petugas informasi','Mengatakan memeriksa istilah manasik pada jurnal.','Catatan istilah cocok dengan lembar yang tersisa.',false,'SA')],
  storyHook:'Pada halaman terakhir jurnal terdapat kode ruang komputer untuk menyimpan arsip perjalanan. Pemeriksaan digital menjadi misi Bab 5.',
  learningPath:L('ch04-hajj-umrah',[
   S('ch04-hajj-umrah','istima','Istima’ — Menyimak','الاستماع','Mengenali kosakata haji/umrah dan menangkap fakta dari teks lisan tentang urutan kegiatan ibadah.','57–58','Materi menyimak memuat pakaian ihram, Ka’bah, tawaf, sa’i, dan pengalaman perjalanan umrah.',['hajj.kaaba','hajj.ihram','hajj.pilgrim','hajj.tawaf','hajj.sai'],[],[
    ['listen-repeat','Dengarkan dan ulangi الْكَعْبَةُ.','الْكَعْبَةُ.','Kata tersebut berarti Ka’bah.','Perhatikan bunyi ka’bah.'],
    ['audio-image-match','Pilih gambar yang sesuai dengan لِبَاسُ الْإِحْرَامِ.','Gambar pakaian ihram.','Frasa tersebut berarti pakaian ihram.','Cari pakaian ihram.'],
    ['listening-detail','Apa kegiatan yang dilakukan setelah tawaf dalam bacaan?','Sa’i antara Safa dan Marwah.','Bacaan menyebut sa’i setelah tawaf.','Dengarkan bagian setelah طُفْنَا.'],
    ['true-false-audio','Tentukan benar/salah: jamaah memakai ihram di miqat.','Benar.','Bacaan menyatakan jamaah mengenakan ihram setelah tiba di miqat.','Dengarkan bagian miqat dan ihram.'],
    ['dictation','Tuliskan kosakata untuk “para jamaah haji”.','حُجَّاجٌ.','حُجَّاجٌ adalah bentuk jamak dari حَاجٌّ.','Cari bentuk jamak pada daftar mufradat.']
   ]),
   S('ch04-hajj-umrah','qiraah','Qira’ah — Membaca','القراءة','Memahami teks rekon pengalaman umrah/haji dan menemukan urutan peristiwa berdasarkan fakta bacaan.','59–62','Bacaan “العمرة مع أسرتي” menceritakan perjalanan dari Juanda ke Jeddah, ihram di miqat, tawaf, sa’i, perjalanan ke Madinah, dan kunjungan.',['hajj.ihram','hajj.kaaba','hajj.tawaf','hajj.sai','hajj.madinah','hajj.makkah'],[],[
    ['identify-orientation','Siapa, kapan, dan ke mana perjalanan pada awal teks?','Penulis bersama keluarga; hari Kamis lalu; ke Makkah.','Informasi ada pada kalimat pembuka.','Cari فِي يَوْمِ الْخَمِيسِ الْمَاضِي.'],
    ['sequence-events','Urutkan: ihram di miqat, tawaf, sa’i, berangkat ke Madinah.','Ihram → tawaf → sa’i → Madinah.','Urutan mengikuti bacaan pengalaman umrah.','Perhatikan ثُمَّ dan بَعْدَ.'],
    ['fact-finding','Berapa putaran tawaf pada bacaan?','Tujuh putaran.','Bacaan menyebut سَبْعَةَ أَشْوَاطٍ.','Cari angka سَبْعَةَ.'],
    ['reorientation','Apa perasaan penulis setelah perjalanan?','Merasa bahagia dan berharap umrahnya diterima.','Kalimat akhir menyatakan rasa bahagia.','Cari وَشَعَرْنَا بِالسَّعَادَةِ.'],
    ['genre-function','Apa fungsi teks rekon Bab 4?','Menceritakan pengalaman masa lalu secara berurutan.','Rangkuman Bab 4 menggunakan struktur teks rekon.','Ingat orientasi, kejadian, komentar.']
   ]),
   S('ch04-hajj-umrah','qawaid','Qawa’id — Tasrif Fi’il Madhi','القاعدة','Menyesuaikan bentuk Fi’il Madhi dengan dhamir sebagai pelaku dalam kalimat.','63–67','Bab 4 membahas perubahan kata kerja lampau berdasarkan dhamir. Contoh tabel: ذَهَبَ، ذَهَبَا، ذَهَبُوا، ذَهَبَتْ، ذَهَبْتَ، ذَهَبْتِ، ذَهَبْتُ، ذَهَبْنَا.',['hajj.tawaf','hajj.sai','hajj.makkah','hajj.madinah'],[],[
    ['pronoun-conjugation','Bentuk ذَهَبَ untuk أَنَا adalah ...','ذَهَبْتُ.','Dhamir orang pertama tunggal menggunakan akhiran تُ.','Lihat baris أَنَا pada tabel.'],
    ['pronoun-conjugation','Bentuk ذَهَبَ untuk نَحْنُ adalah ...','ذَهَبْنَا.','Bentuk orang pertama jamak menggunakan نَا.','Perhatikan bentuk نحن.'],
    ['gender-conjugation','Bentuk ذَهَبَ untuk هِيَ adalah ...','ذَهَبَتْ.','Bentuk perempuan tunggal mendapat akhiran تْ.','Cari kolom هي.'],
    ['plural-conjugation','Bentuk ذَهَبَ untuk هُمْ adalah ...','ذَهَبُوا.','Laki-laki jamak orang ketiga menggunakan وا.','Lihat baris هم.'],
    ['sentence-correction','Pilih bentuk yang sesuai: أَنَا ... إِلَى مَكَّةَ.','ذَهَبْتُ.','Fi’il harus sesuai dengan dhamir أَنَا.','Subjek أَنَا memakai bentuk orang pertama tunggal.']
   ]),
   S('ch04-hajj-umrah','kitabah','Kitabah — Menulis','الكتابة','Melengkapi kalimat dan menulis teks rekon haji/umrah menggunakan Fi’il Madhi sesuai subjek.','68','Latihan menulis meminta siswa melengkapi kalimat dengan fi’il madhi, menyesuaikan fi’il dengan fa’il, dan menyusun teks rekon.',['hajj.makkah','hajj.madinah','hajj.tawaf','hajj.sai','hajj.arafah'],[],[
    ['complete-verb','Lengkapi أَنَا ... مَكَّةَ فِي الْأُسْبُوعِ الْمَاضِي.','زُرْتُ.','Subjek أَنَا memerlukan bentuk orang pertama.','Pilih fi’il berakhiran تُ.'],
    ['reorder-words','Susun قَرَأَتْ / صَافِيَّةُ / الْقُرْآنَ.','قَرَأَتْ صَافِيَّةُ الْقُرْآنَ.','قَرَأَتْ sesuai subjek perempuan tunggal.','Letakkan fi’il sebelum fa’il.'],
    ['conjugate-subject','Ubah ذَهَبَ agar sesuai dengan نَحْنُ.','ذَهَبْنَا.','Akhiran نَا menunjukkan orang pertama jamak.','Lihat tabel tasrif.'],
    ['recount-order','Susun kegiatan: berangkat menuju miqat, memakai ihram, tawaf, sa’i.','Berangkat menuju miqat → mengenakan ihram → tawaf → sa’i.','Teks rekon menyajikan peristiwa berurutan.','Gunakan penanda waktu dan ثُمَّ.'],
    ['write-recount','Tulis teks rekon singkat tentang perjalanan dengan empat kata kunci.','Rubrik: orientasi, kejadian, reorientasi, tasrif madhi.','Penilaian mencakup kesesuaian Fi’il Madhi.','Gunakan ذَهَبْتُ، لَبِسْتُ، طُفْتُ، شَعَرْتُ.']
   ],{criteria:['Struktur teks rekon','Fi’il Madhi sesuai dhamir','Urutan kejadian','Kosakata haji/umrah']}),
   S('ch04-hajj-umrah','kalam','Kalam — Berbicara','الكلام','Bertanya dan menjawab tentang pengalaman masa lalu menggunakan Fi’il Madhi.','69–70','Dialog Bab 4 meminta siswa menanyakan tujuan perjalanan, kegiatan yang dilakukan, dan perasaan setelah umrah/haji.',['hajj.makkah','hajj.madinah','hajj.kaaba','hajj.tawaf','hajj.sai'],[],[
    ['pronunciation','Ucapkan ذَهَبْتُ، طُفْتُ، سَعَيْتُ.','Tiga bentuk Fi’il Madhi orang pertama.','Pelafalan mempertahankan harakat dan akhiran.','Ulangi tiap kata perlahan.'],
    ['ask-past-event','Tanyakan ke mana teman pergi minggu lalu.','إِلَى أَيْنَ ذَهَبْتَ فِي الْأُسْبُوعِ الْمَاضِي؟','Pertanyaan sesuai model dialog buku.','Gunakan أَيْنَ dan ذَهَبْتَ.'],
    ['answer-past-event','Jawab bahwa kamu pergi ke Makkah untuk umrah.','ذَهَبْتُ إِلَى مَكَّةَ لِأَدَاءِ الْعُمْرَةِ.','ذَهَبْتُ sesuai أَنَا.','Gunakan akhiran تُ.'],
    ['describe-experience','Ceritakan satu kegiatan umrah menggunakan Fi’il Madhi.','Rubrik: fi’il, subjek, kegiatan, urutan.','Gunakan kata kerja yang dipelajari dalam bab.','Pilih طَافَ، سَعَى، لَبِسَ، زَارَ.'],
    ['pair-dialogue','Praktikkan dialog dua orang tentang pengalaman umrah/haji.','Rubrik: pertanyaan masa lalu, jawaban, tasrif, kelancaran.','Percakapan dinilai berdasarkan isi dan bentuk kata kerja.','Ikuti model dialog halaman 69.']
   ],{criteria:['Ungkapan masa lalu','Ketepatan tasrif','Pelafalan','Kelancaran dialog']}),
   S('ch04-hajj-umrah','mission','Misi Akhir — Rekonstruksi Jurnal Ibadah','مَهَمَّةُ الرِّحْلَةِ','Menyusun kronologi jurnal perjalanan menggunakan fakta bacaan dan tasrif Fi’il Madhi.','55–71','Konteks game: halaman jurnal perjalanan ibadah tertukar. Pemain menyusun kronologi sesuai teks; cerita tidak mengubah materi ibadah dari sumber.',['hajj.ihram','hajj.passport','hajj.suitcase','hajj.guidebook','hajj.prayer_mat','hajj.kaaba','hajj.tawaf'],[],missionTasks('ch04-hajj-umrah',[
    ['Temukan catatan ihram, tawaf, sa’i, Arafah, dan Madinah.','Lima petunjuk jurnal ditemukan.','Petunjuk menggambarkan tempat dan kegiatan dalam bacaan.','Periksa lembar miqat dan urutan kegiatan.'],
    ['Cocokkan kegiatan dengan istilah Arabnya.','إِحْرَامٌ، طَوَافٌ، سَعْيٌ، عَرَفَةُ، الْمَدِينَةُ.','Istilah berasal dari daftar mufradat Bab 4.','Buka Kamus Detektif Bab 4.'],
    ['Susun urutan peristiwa dari bacaan umrah.','Miqat/ihram → tawaf → sa’i → Madinah.','Urutan mengikuti teks العمرة مع أسرتي.','Cari penanda ثُمَّ dan بَعْدَ.'],
    ['Ubah ذَهَبَ menjadi bentuk untuk أَنَا dan نَحْنُ.','ذَهَبْتُ dan ذَهَبْنَا.','Bentuk kata kerja mengikuti dhamir.','Lihat tabel tasrif Fi’il Madhi.'],
    ['Ceritakan kronologi jurnal secara lisan dengan Fi’il Madhi.','Rubrik: kronologi, tasrif, kosakata, kejelasan.','Kesimpulan disampaikan berdasarkan catatan perjalanan.','Gunakan ذَهَبْتُ، لَبِسْنَا، طُفْنَا، سَعَيْنَا.']
   ]))
  ]),
  mastery:[
   q('h1','vocabulary','Apa arti الْكَعْبَةُ?',['Ka’bah','Madinah','Arafah','Mina'],0,'الْكَعْبَةُ berarti Ka’bah.','hajj.kaaba',true),
   q('h2','vocabulary','لِبَاسُ الْإِحْرَامِ berarti ...',['Pakaian ihram','Hotel','Jamarat','Perjalanan'],0,'Frasa tersebut berarti pakaian ihram.','hajj.ihram',true),
   q('h3','reading','Struktur teks rekon adalah ...',['Orientasi, kejadian, reorientasi','Tujuan, materi, langkah','Deskripsi umum, khusus','Tesis, argumen, penguatan'],0,'Teks rekon memiliki tiga unsur tersebut.'),
   q('h4','reading','Dalam bacaan umrah, setelah tawaf kegiatan berikutnya adalah ...',['Sa’i antara Safa dan Marwah','Menuju bandara','Membeli obat','Mengunjungi pantai'],0,'Bacaan menyebut sa’i setelah tawaf.'),
   q('h5','grammar','Bentuk ذَهَبَ untuk أَنَا adalah ...',['ذَهَبْتُ','ذَهَبُوا','ذَهَبَتْ','ذَهَبْنَا'],0,'Akhiran تُ menandai orang pertama tunggal.'),
   q('h6','grammar','Bentuk ذَهَبَ untuk نَحْنُ adalah ...',['ذَهَبْنَا','ذَهَبْتُ','ذَهَبَتْ','ذَهَبُوا'],0,'نَحْنُ menggunakan bentuk ذَهَبْنَا.'),
   q('h7','vocabulary','Apa arti طَوَافٌ?',['Tawaf','Sa’i','Ihram','Wukuf'],0,'طَوَافٌ berarti tawaf.','hajj.tawaf',true),
   q('h8','grammar','Bentuk ذَهَبَ untuk هِيَ adalah ...',['ذَهَبَتْ','ذَهَبْتُ','ذَهَبُوا','ذَهَبْنَا'],0,'Perempuan tunggal menggunakan akhiran تْ.'),
   q('h9','reading','Bagian reorientasi pada teks rekon berisi ...',['Komentar atau hasil peristiwa','Daftar bahan','Argumen pendukung','Definisi umum'],0,'Reorientasi berisi komentar/hasil pengalaman.'),
   q('h10','vocabulary','Apa arti الْمَدِينَةُ?',['Madinah/kota','Ka’bah','Arafah','Jamarat'],0,'الْمَدِينَةُ berarti Madinah/kota.','hajj.madinah',true)
  ]
 },

 'ch05-ict': {
  contentVersion:'2.0.0',
  caseInfo:{id:'ch05-ict',number:'05',title:'Verifikasi Informasi Digital',location:'Laboratorium komputer dan ruang media',description:'Berkas informasi teknologi tersimpan pada folder yang tidak sesuai.',briefing:['Tim media menemukan berkas informasi teknologi di folder yang salah.','Periksa perangkat, aplikasi, serta teks tentang manfaat dan dampak teknologi.','Gunakan teks eksposisi dan tasrif Fi’il Mudhari’ untuk memverifikasi isi berkas.']},
  curriculum:{semester:'Genap',chapter:5,level:'MA Kelas XI',focus:'تكنولوجيا الإعلام والاتصال — komputer, telepon genggam, aktivitas online; tindakan sekarang dan akan datang.',textGenre:'النص البرهاني — teks eksposisi: tesis, argumen, penguatan.',grammar:'تصريف الفعل المضارع اللغوي — perubahan Fi’il Mudhari’ menurut dhamir.',sourcePages:'72–86',coreVocabIds:['ict.screen','ict.keyboard','ict.mouse','ict.laptop','ict.wifi','ict.download','ict.app','ict.whatsapp','ict.internet','ict.addiction','ict.thesis']},
  unlock:{prerequisites:['ch04-hajj-umrah'],minMastery:70},sceneType:'technology',
  evidence:[
   ev('screen','ict.screen','شَاشَةُ الْحَاسُوبِ','syāsyatu al-ḥāsūbi','layar komputer','🖥️','Monitor menampilkan informasi digital yang digunakan dalam kegiatan pembelajaran.','Amati monitor besar di meja bagian kanan depan.',{left:82,top:53,width:19,height:29}),
   ev('keyboard','ict.keyboard','لَوْحَةُ مَفَاتِيحِ التَّرْمِيزِ','lawḥatu mafātīḥi at-tarmīzi','papan ketik','⌨️','Papan ketik membantu siswa memasukkan teks dan perintah ke komputer.','Periksa keyboard yang berada tepat di depan monitor besar.',{left:82,top:76,width:19,height:13}),
   ev('wifi','ict.wifi','وَايْ فَايْ','wāy fāy','Wi-Fi','📶','Router menyediakan koneksi jaringan nirkabel untuk perangkat di laboratorium.','Cari perangkat jaringan hitam dengan antena di meja kiri.',{left:16,top:66,width:17,height:14}),
   ev('download','ict.laptop','حَاسُوبٌ مَحْمُولٌ','ḥāsūbun maḥmūlun','laptop','💻','Laptop digunakan untuk membuka dokumen dan mengolah informasi digital.','Cari laptop terbuka di meja bagian tengah depan.',{left:51,top:68,width:19,height:23}),
   ev('app','ict.app','تَطْبِيقَاتٌ','taṭbīqātun','aplikasi','📱','Telepon genggam dapat menjalankan berbagai aplikasi komunikasi dan pembelajaran.','Cari telepon genggam berwarna gelap di meja depan kiri tengah.',{left:36,top:77,width:12,height:11})
  ],
  puzzle:{pieces:[piece('p1','الْجَوَّالُ الذَّكِيُّ','al-jawwālu adh-dhakiyyu','ponsel pintar'),piece('p2','يُسَاعِدُنَا','yusāʿidunā','membantu kita'),piece('p3','عَلَى الِاتِّصَالِ','ʿalā al-ittiṣāli','untuk berkomunikasi'),piece('p4','بِالْأَهْلِ وَالْأَصْدِقَاءِ','bil-ahli wa-al-aṣdiqāʾi','dengan keluarga dan teman')],initialOrder:['p3','p1','p4','p2'],acceptedOrders:[['p1','p2','p3','p4']],fullTranslation:'Ponsel pintar membantu kita berkomunikasi dengan keluarga dan teman.',grammarNote:'يُسَاعِدُ adalah Fi’il Mudhari’ untuk هُوَ. Bentuk berubah menurut dhamir: يُسَاعِدُ، تُسَاعِدُ، أُسَاعِدُ، نُسَاعِدُ.'},
  suspects:[suspect('rani','Rani','رَانِي','Editor ruang media','Mengatakan sudah menyimpan berkas pada folder informasi.','Riwayat unduhan menunjukkan ia memindahkan berkas ke folder arsip lain.',true,'RA'),suspect('dimas','Dimas','دِمَاسٌ','Operator komputer','Mengatakan sedang memperbaiki keyboard.','Catatan perangkat sesuai dengan waktu pemeriksaan.',false,'DI'),suspect('nisa','Nisa','نِسَاءُ','Pengelola jaringan','Mengatakan memeriksa koneksi Wi-Fi.','Log jaringan mendukung keterangannya.',false,'NI')],
  storyHook:'Metadata berkas memuat kata kunci tentang keberagaman Indonesia. Arsip terakhir akan diverifikasi pada Bab 6.',
  learningPath:L('ch05-ict',[
   S('ch05-ict','istima','Istima’ — Menyimak','الاستماع','Mengenali kosakata perangkat, aplikasi, internet, serta menangkap pendapat dan fakta dari teks lisan teknologi.','74–75','Materi menyimak mencakup layar komputer, keyboard, mouse, permainan, nama file, unduhan, GPS, Wi-Fi, laptop, dan telepon genggam.',['ict.screen','ict.keyboard','ict.mouse','ict.laptop','ict.wifi','ict.download','ict.app'],[],[
    ['listen-repeat','Dengarkan dan ulangi شَاشَةُ الْحَاسُوبِ.','شَاشَةُ الْحَاسُوبِ.','Artinya layar komputer.','Perhatikan dua kata dalam frasa.'],
    ['audio-image-match','Pilih gambar yang sesuai dengan الْفَأْرَةُ.','Gambar mouse komputer.','Dalam konteks teknologi, الْفَأْرَةُ berarti mouse.','Pilih perangkat penunjuk komputer.'],
    ['listening-detail','Sebutkan satu aplikasi komunikasi yang disebut dalam materi.','وَاتْسَاب atau اِنْسْتَقْرَام atau تَوِيْتَر.','Ketiganya disebut dalam teks Bab 5.','Dengarkan bagian contoh aplikasi.'],
    ['listening-opinion','Apa pendapat dalam audio tentang manfaat ponsel pintar?','Membantu komunikasi dengan keluarga dan teman.','Gagasan ini menjadi pendapat utama teks.','Cari kalimat الرَّأْيِى أَنَّ الْجَوَّالَ.'],
    ['dictation','Tuliskan kosakata yang terdengar untuk “unduhan”.','تَحْمِيلٌ.','تَحْمِيلٌ berarti unduh/unduhan.','Dengarkan taḥmīl.']
   ]),
   S('ch05-ict','qiraah','Qira’ah — Membaca','القراءة','Mengevaluasi gagasan dan fakta dalam teks eksposisi tentang manfaat/dampak teknologi dan internet.','76–78','Bacaan membahas dampak permainan online terhadap tanggung jawab, kesehatan, kehidupan sosial, dan kehidupan keagamaan; teks eksposisi ponsel memuat tesis, argumen, dan penguatan.',['ict.laptop','ict.internet','ict.whatsapp','ict.app','ict.addiction','ict.thesis'],[],[
    ['identify-thesis','Apa yang disebut tesis dalam teks eksposisi?','Pernyataan atau gagasan utama yang dibahas.','Tesis merupakan bagian الْقَضِيَّةُ.','Cari pendapat utama penulis.'],
    ['identify-argument','Bagian mana yang berisi alasan pendukung pendapat?','الْحُجَجُ (argumen).','Argumen mendukung tesis.','Cari alasan dan contoh yang memperkuat pendapat.'],
    ['identify-reinforcement','Apa fungsi التَّأْكِيدُ pada teks eksposisi?','Penguatan atau penegasan kembali pendapat.','Bagian akhir menegaskan gagasan yang dijelaskan.','Cari kalimat penutup.'],
    ['fact-finding','Sebutkan satu dampak permainan online yang dibahas dalam teks.','Mengabaikan tanggung jawab, gangguan kesehatan, kecanduan, atau menarik diri dari lingkungan.','Dampak dibahas dari beberapa sisi.','Periksa dialog siswa pada bacaan.'],
    ['evaluate-claim','Pernyataan mana yang tidak sesuai: teknologi bermanfaat jika digunakan sesuai kebutuhan atau ponsel tidak bermanfaat?','Ponsel tidak bermanfaat.','Teks menyebut ponsel membantu komunikasi jika digunakan sesuai kebutuhan.','Bandingkan pernyataan dengan paragraf penguatan.']
   ]),
   S('ch05-ict','qawaid','Qawa’id — Tasrif Fi’il Mudhari’','القاعدة','Menyesuaikan bentuk Fi’il Mudhari’ dengan dhamir untuk menyatakan tindakan sekarang dan akan datang.','79–83','Bab 5 menjelaskan awalan dan akhiran Fi’il Mudhari’: يـ untuk orang ketiga laki-laki, تـ untuk orang kedua dan ketiga perempuan, أ untuk أنا, ن untuk نحن; bentuk mutsanna/jamak memiliki tambahan tertentu.',['ict.laptop','ict.internet','ict.whatsapp','ict.app'],[],[
    ['identify-mudhari','Tentukan Fi’il Mudhari’ dalam يُسَاعِدُنَا الْجَوَّالُ.','يُسَاعِدُ.','Kata kerja menunjukkan tindakan sekarang/kebiasaan.','Cari kata kerja yang diawali يـ.'],
    ['pronoun-conjugation','Bentuk يُسَاعِدُ untuk أَنَا adalah ...','أُسَاعِدُ.','Orang pertama tunggal menggunakan awalan أ.','Lihat tabel tasrif untuk أنا.'],
    ['pronoun-conjugation','Bentuk يُسَاعِدُ untuk هِيَ adalah ...','تُسَاعِدُ.','Perempuan tunggal menggunakan awalan تـ.','Perhatikan perubahan يـ menjadi تـ.'],
    ['plural-conjugation','Bentuk يُسَاعِدُ untuk هُمْ adalah ...','يُسَاعِدُونَ.','Orang ketiga laki-laki jamak menggunakan ونَ.','Lihat tabel jamak pada buku.'],
    ['sentence-correction','Pilih bentuk sesuai subjek أَنَا: ... الْمَلَفَّ (mengunduh file).','أُحَمِّلُ.','أُحَمِّلُ adalah bentuk orang pertama tunggal.','Gunakan awalan أ untuk أنا.']
   ]),
   S('ch05-ict','kitabah','Kitabah — Menulis','الكتابة','Menyusun teks eksposisi tentang teknologi dengan tesis, argumen, penguatan, dan Fi’il Mudhari’.','83–84','Latihan menulis meminta siswa menyusun kalimat menjadi teks eksposisi dan menulis paragraf berdasarkan pertanyaan tentang internet/WhatsApp.',['ict.internet','ict.whatsapp','ict.app','ict.laptop','ict.thesis'],[],[
    ['identify-thesis-sentence','Pilih kalimat yang dapat menjadi tesis tentang internet.','فِي رَأْيِي أَنَّ اسْتِخْدَامَ الْإِنْتِرْنِتِ مُهِمٌّ.','Kalimat menyatakan pendapat utama.','Cari ungkapan فِي رَأْيِي.'],
    ['organize-arguments','Kelompokkan alasan manfaat internet untuk pendidikan dan komunikasi.','Argumen pendidikan dan komunikasi.','Argumen mendukung tesis tentang manfaat internet.','Gunakan fakta dari bacaan.'],
    ['reorder-paragraph','Susun teks: tesis → argumen → penguatan.','القَضِيَّة → الْحُجَج → التَّأْكِيد.','Itulah struktur teks eksposisi Bab 5.','Urutkan dari pendapat utama hingga penegasan.'],
    ['conjugate-in-writing','Lengkapi kalimat dengan bentuk untuk أنا: ... الْإِنْتِرْنِتَ.','أَسْتَخْدِمُ.','أَسْتَخْدِمُ adalah bentuk orang pertama tunggal.','Awalan أ untuk أنا.'],
    ['write-exposition','Tulislah paragraf eksposisi tentang penggunaan internet berdasarkan pertanyaan buku.','Rubrik: tesis, dua argumen, penguatan, Fi’il Mudhari’.','Penilaian memeriksa struktur dan tasrif.','Pilih argumen dari teks tentang pendidikan, komunikasi, perdagangan.']
   ],{criteria:['Tesis jelas','Argumen relevan dan berbasis bacaan','Penguatan','Ketepatan Fi’il Mudhari’']}),
   S('ch05-ict','kalam','Kalam — Berbicara','الكلام','Menyampaikan pendapat dan menanyakan penggunaan teknologi menggunakan Fi’il Mudhari’.','85','Latihan berbicara meminta siswa menyatakan pendapat tentang manfaat ponsel, internet, pembelajaran elektronik, perdagangan online, dan video call.',['ict.internet','ict.whatsapp','ict.laptop','ict.app','ict.addiction'],[],[
    ['pronunciation','Ucapkan الْجَوَّالُ الذَّكِيُّ dan الْإِنْتِرْنِتُ.','Pelafalan sesuai harakat.','Latihan pelafalan memakai kosakata inti Bab 5.','Ucapkan perlahan.'],
    ['give-opinion','Sampaikan pendapat tentang penggunaan WhatsApp.','Rubrik: pendapat, alasan, kosakata.','Pendapat harus didukung alasan relevan.','Mulai dengan فِي رَأْيِي.'],
    ['ask-opinion','Tanyakan pendapat teman tentang ponsel pintar.','مَا رَأْيُكَ فِي الْجَوَّالِ الذَّكِيِّ؟','Pertanyaan sesuai tema berbicara Bab 5.','Gunakan مَا رَأْيُكَ.'],
    ['explain-benefit','Jelaskan satu manfaat internet dalam pembelajaran.','Rubrik: manfaat, contoh, Fi’il Mudhari’.','Buku menyebut internet membantu pendidikan dan pembelajaran.','Gunakan يُفِيدُ الْإِنْتِرْنِتُ.'],
    ['short-presentation','Presentasikan pendapat tentang penggunaan teknologi secara bijak.','Rubrik: tesis lisan, alasan, penegasan, pelafalan.','Presentasi harus sesuai materi buku.','Gunakan struktur teks eksposisi.']
   ],{criteria:['Kejelasan pendapat','Argumen relevan','Fi’il Mudhari’ sesuai dhamir','Kelancaran dan pelafalan']}),
   S('ch05-ict','mission','Misi Akhir — Verifikasi Informasi Digital','مَهَمَّةُ التَّحَقُّقِ الرَّقْمِيِّ','Mengevaluasi berkas digital dengan membaca teks eksposisi dan memperbaiki Fi’il Mudhari’.','72–86','Konteks game: berkas informasi teknologi tersimpan pada folder yang salah. Pemain memverifikasi fakta, argumen, dan bentuk kata kerja.',['ict.screen','ict.keyboard','ict.wifi','ict.download','ict.app','ict.internet'],[],missionTasks('ch05-ict',[
    ['Temukan layar komputer, keyboard, Wi-Fi, unduhan, dan aplikasi.','Lima petunjuk digital ditemukan.','Petunjuk berkaitan dengan tema teknologi Bab 5.','Periksa meja komputer dan riwayat unduhan.'],
    ['Cocokkan perangkat dengan kosakata Arab.','شَاشَةُ الْحَاسُوبِ، لَوْحَةُ الْمَفَاتِيحِ، وَايْ فَايْ، تَحْمِيلٌ.','Semua kata ada pada daftar mufradat Bab 5.','Buka daftar kata Bab 5.'],
    ['Tandai tesis, argumen, dan penguatan pada berkas.','القَضِيَّة → الْحُجَج → التَّأْكِيد.','Struktur teks eksposisi harus runtut.','Cari pendapat, alasan, lalu penegasan.'],
    ['Ubah يُسَاعِدُ menjadi bentuk untuk أَنَا.','أُسَاعِدُ.','Awalan Fi’il Mudhari’ berubah sesuai dhamir.','Orang pertama tunggal memakai أ.'],
    ['Presentasikan hasil verifikasi informasi teknologi.','Rubrik: fakta, argumen, Fi’il Mudhari’, kejelasan.','Kesimpulan harus merujuk isi berkas dan teks.','Gunakan pendapat dan alasan dari bacaan.']
   ]))
  ]),
  mastery:[
   q('c1','vocabulary','Apa arti شَاشَةُ الْحَاسُوبِ?',['Layar komputer','Keyboard','Mouse','Unduhan'],0,'Frasa tersebut berarti layar komputer.','ict.screen',true),
   q('c2','vocabulary','تَحْمِيلٌ berarti ...',['Unduhan','Aplikasi','Jaringan','Kecanduan'],0,'تَحْمِيلٌ berarti unduh/unduhan.','ict.download',true),
   q('c3','reading','Struktur teks eksposisi adalah ...',['Tesis, argumen, penguatan','Orientasi, kejadian, reorientasi','Tujuan, materi, langkah','Deskripsi umum, khusus'],0,'Struktur teks eksposisi terdiri dari tesis, argumen, dan penguatan.'),
   q('c4','reading','Apa fungsi argumen dalam teks eksposisi?',['Menguatkan pendapat/tesis','Menyebut tokoh dan waktu','Menjelaskan langkah kerja','Memberi deskripsi umum'],0,'Argumen mendukung tesis yang disampaikan.'),
   q('c5','grammar','Bentuk Fi’il Mudhari’ untuk أَنَا pada contoh سَاعَدَ adalah ...',['أُسَاعِدُ','يُسَاعِدُ','تُسَاعِدُ','يُسَاعِدُونَ'],0,'Orang pertama tunggal menggunakan awalan أ.'),
   q('c6','grammar','Bentuk يُسَاعِدُ untuk هِيَ adalah ...',['تُسَاعِدُ','أُسَاعِدُ','يُسَاعِدُونَ','نُسَاعِدُ'],0,'Untuk هِيَ awalan يـ berubah menjadi تـ.'),
   q('c7','vocabulary','Apa arti إِدْمَانٌ?',['Kecanduan','Manfaat','Aplikasi','Papan ketik'],0,'إِدْمَانٌ berarti kecanduan.','ict.addiction',true),
   q('c8','reading','Salah satu dampak permainan online yang disebut buku adalah ...',['Mengabaikan tanggung jawab atau gangguan kesehatan','Meningkatkan semua kemampuan sekolah','Menghilangkan kebutuhan istirahat','Membuat semua orang lebih aktif'],0,'Bacaan membahas dampak pada tanggung jawab dan kesehatan.'),
   q('c9','grammar','Bentuk يُسَاعِدُ untuk نَحْنُ adalah ...',['نُسَاعِدُ','أُسَاعِدُ','تُسَاعِدُ','يُسَاعِدُ'],0,'Dhamir نَحْنُ menggunakan awalan ن.'),
   q('c10','vocabulary','Apa arti وَاتْسَاب?',['WhatsApp','Instagram','Twitter','GPS'],0,'وَاتْسَاب adalah nama aplikasi WhatsApp.','ict.whatsapp',true)
  ]
 },

 'ch06-religions': {
  contentVersion:'2.0.0',
  caseInfo:{id:'ch06-religions',number:'06',title:'Pameran Informasi Keberagaman Indonesia',location:'Ruang pameran dan pusat dokumentasi madrasah',description:'Kartu informasi pameran tentang agama dan tempat ibadah tersusun tidak sesuai kategorinya.',briefing:['Tim pameran menemukan kartu informasi yang belum tersusun rapi.','Periksa bacaan tentang agama, tempat ibadah, dan toleransi dengan sikap objektif.','Kelompokkan kalimat berdasarkan Jumlah Ismiyyah dan Jumlah Fi’liyyah.']},
  curriculum:{semester:'Genap',chapter:6,level:'MA Kelas XI',focus:'الأديان في إندونيسيا — agama dan tempat ibadah di Indonesia, toleransi; meminta dan memberi informasi.',textGenre:'النص الوصفي — teks deskriptif objektif: deskripsi umum dan khusus.',grammar:'الجملة الاسمية والجملة الفعلية — Mubtada’+Khabar dan Fi’il+Fa’il.',sourcePages:'87–100',coreVocabIds:['religion.religion','religion.islam','religion.protestant','religion.catholic','religion.hindu','religion.buddhist','religion.confucian','religion.mosque','religion.church','religion.temple','religion.tolerance']},
  unlock:{prerequisites:['ch05-ict'],minMastery:70},sceneType:'religions',
  evidence:[
   ev('religion','religion.religion','دِينٌ','dīnun','agama','📘','Buku pameran memuat informasi tentang agama dan kehidupan masyarakat Indonesia.','Cari tumpukan buku di meja pameran bagian kiri depan.',{left:18,top:86,width:25,height:18}),
   ev('mosque','religion.mosque','مَسْجِدٌ','masjidun','masjid','🕌','Bangunan berkubah hijau pada pameran menggambarkan masjid sebagai tempat ibadah umat Islam.','Amati bangunan berkubah hijau di sisi kiri atas.',{left:14,top:18,width:20,height:25}),
   ev('church','religion.church','كَنِيسَةٌ','kanīsatun','gereja','⛪','Bangunan bergaya gereja pada pameran mewakili tempat ibadah umat Kristiani.','Cari bangunan putih dengan menara dan salib di bagian atas tengah.',{left:31,top:18,width:20,height:25}),
   ev('temple','religion.temple','مَعْبَدٌ','maʿbadun','tempat ibadah/kuil','🛕','Bangunan beratap bertingkat dan vihara menjadi bagian dari pameran tempat ibadah.','Amati bangunan merah beratap bertingkat di sisi kanan atas.',{left:72,top:19,width:23,height:29}),
   ev('tolerance','religion.tolerance','التَّسَامُحُ','at-tasāmuḥu','toleransi','🤝','Papan pameran menyampaikan pesan persatuan dan penghormatan terhadap keberagaman.','Baca papan besar bertuliskan Pameran Keberagaman Indonesia di sisi kanan.',{left:92,top:31,width:14,height:32})
  ],
  puzzle:{pieces:[piece('p1','يُصَلِّي','yuṣallī','salat'),piece('p2','الْمُسْلِمُونَ','al-muslimūna','umat Islam'),piece('p3','فِي','fī','di'),piece('p4','الْمَسَاجِدِ','al-masājidi','masjid-masjid')],initialOrder:['p3','p1','p4','p2'],acceptedOrders:[['p1','p2','p3','p4']],fullTranslation:'Umat Islam salat di masjid-masjid.',grammarNote:'Kalimat ini merupakan Jumlah Fi’liyyah: Fi’il يُصَلِّي diikuti Fa’il الْمُسْلِمُونَ. Contoh Jumlah Ismiyyah dalam buku: الْمُسْلِمُ مُجْتَهِدٌ.'},
  suspects:[suspect('farah','Farah','فَرَحٌ','Koordinator kartu informasi','Mengatakan kartu sudah ditempatkan menurut tema.','Catatan penataan menunjukkan ia memindahkan kartu toleransi ke papan utama.',true,'FA'),suspect('bima','Bima','بِيمَا','Petugas dokumentasi','Mengatakan sedang mengambil foto pameran.','Foto menunjukkan ia berada di sisi ruang pameran.',false,'BI'),suspect('nada','Nada','نَدَى','Penyusun denah','Mengatakan sedang memeriksa lokasi panel.','Denah cocok dengan lokasi kartu yang tersisa.',false,'NA')],
  storyHook:'Enam berkas pengetahuan Basyir Agency kini tersusun. Pemain telah menyelesaikan kampanye dan dapat mengulang bab untuk memperkuat penguasaan bahasa.',
  learningPath:L('ch06-religions',[
   S('ch06-religions','istima','Istima’ — Menyimak','الاستماع','Mengenali kosakata agama dan tempat ibadah serta menangkap fakta dari teks lisan secara objektif dan santun.','89–90','Materi menyimak mengangkat informasi tentang Masjid Istiqlal, lokasi, jumlah lantai, perpustakaan, dan unsur bangunan.',['religion.religion','religion.islam','religion.mosque','religion.church','religion.temple'],[],[
    ['listen-repeat','Dengarkan dan ulangi التَّسَامُحُ.','التَّسَامُحُ.','Artinya toleransi.','Perhatikan bunyi ta-sā-muḥ.'],
    ['audio-image-match','Pilih gambar yang sesuai dengan مَسْجِدٌ.','Gambar masjid.','مَسْجِدٌ berarti masjid.','Pilih tempat ibadah umat Islam.'],
    ['listening-detail','Nama masjid terkenal di Jakarta yang disebut buku adalah ...','مَسْجِدُ الِاسْتِقْلَالِ.','Teks menyebut Masjid Istiqlal di Jakarta.','Dengarkan nama setelah أَشْهَرُ الْمَسَاجِدِ.'],
    ['fact-check-audio','Tentukan benar/salah: bacaan menyebut enam agama di Indonesia.','Benar.','Bacaan menyebut سِتَّةُ أَدْيَانٍ.','Dengarkan jumlah sebelum daftar nama agama.'],
    ['dictation','Tuliskan kosakata yang terdengar untuk “gereja”.','كَنِيسَةٌ.','كَنِيسَةٌ berarti gereja.','Dengarkan ka-nī-sah.']
   ]),
   S('ch06-religions','qiraah','Qira’ah — Membaca','القراءة','Memahami informasi faktual dalam teks deskriptif tentang agama dan tempat ibadah serta membedakan deskripsi umum dan khusus.','91–92','Teks menjelaskan pengertian agama, enam agama yang disebut dalam buku, dan contoh tempat ibadah: masjid, gereja, pura, vihara, dan kelenteng. Pendekatan pembelajaran objektif dan menghormati seluruh pemeluk agama.',['religion.religion','religion.islam','religion.protestant','religion.catholic','religion.hindu','religion.buddhist','religion.confucian','religion.mosque','religion.church','religion.temple'],[],[
    ['identify-main-idea','Apa gagasan umum teks الأديان في إندونيسيا?','Informasi tentang agama-agama di Indonesia dan tempat ibadahnya.','Teks memperkenalkan agama dan tempat ibadah.','Baca judul dan paragraf pertama.'],
    ['fact-finding','Berapa agama yang disebut dalam bacaan?','Enam agama.','Teks menyebut سِتَّةُ أَدْيَانٍ.','Cari angka sebelum daftar agama.'],
    ['match-information','Tempat ibadah umat Islam dalam bacaan adalah ...','الْمَسَاجِدُ.','Bacaan menyebut umat Islam salat di masjid.','Cari kalimat يُصَلِّي الْمُسْلِمُونَ.'],
    ['compare-information','Tempat ibadah yang disebut untuk umat Hindu dan Buddha adalah ...','الْمَعْبَدُ.','Bacaan menyebut umat Hindu dan Buddha beribadah di معبد.','Cari kata يَتَعَبَّدُ.'],
    ['text-structure','Apa dua struktur umum teks deskriptif Bab 6?','الوَصْفُ الْعَامُّ dan الوَصْفُ الْخَاصُّ.','Rangkuman menyebut deskripsi umum dan khusus.','Ingat dua unsur teks deskriptif.']
   ]),
   S('ch06-religions','qawaid','Qawa’id — Jumlah Ismiyyah dan Fi’liyyah','القاعدة','Membedakan Jumlah Ismiyyah dan Jumlah Fi’liyyah serta menyesuaikan bentuk fi’il dengan fa’il.','93–95','Jumlah Fi’liyyah terdiri dari Fi’il + Fa’il. Jumlah Ismiyyah terdiri dari Mubtada’ + Khabar. Contoh buku: الْمُسْلِمُ مُجْتَهِدٌ dan يُصَلِّي الْمُسْلِمُ فِي الْمَسْجِدِ. Buku juga menunjukkan penyesuaian bentuk fi’il menurut subjek.',['religion.mosque','religion.religion','religion.tolerance'],[],[
    ['classify-sentence','Klasifikasikan الْمُسْلِمُ مُجْتَهِدٌ.','Jumlah Ismiyyah.','Kalimat dimulai dengan isim dan terdiri dari Mubtada’ + Khabar.','Perhatikan kata pertama.'],
    ['classify-sentence','Klasifikasikan يُصَلِّي الْمُسْلِمُونَ فِي الْمَسَاجِدِ.','Jumlah Fi’liyyah.','Kalimat dimulai dengan fi’il dan memiliki fa’il.','Cari kata kerja di awal kalimat.'],
    ['identify-components','Dalam الْمُسْلِمُ مُجْتَهِدٌ, الْمُسْلِمُ berfungsi sebagai ...','Mubtada’.','Jumlah Ismiyyah terdiri dari Mubtada’ dan Khabar.','Kata pertama menjadi pokok yang diterangkan.'],
    ['identify-components','Dalam يَذْهَبُ الطَّالِبُ إِلَى الْمَدْرَسَةِ, يَذْهَبُ adalah ...','Fi’il.','Jumlah Fi’liyyah terdiri dari fi’il dan fa’il.','Cari kata yang menyatakan tindakan.'],
    ['correct-agreement','Perbaiki: الطَّالِبَاتُ يَدْرُسُ الْعَرَبِيَّةَ.','الطَّالِبَاتُ يَدْرُسْنَ الْعَرَبِيَّةَ.','Fi’il disesuaikan dengan fa’il perempuan jamak pada pola buku.','Periksa subjek الطَّالِبَاتُ.']
   ]),
   S('ch06-religions','kitabah','Kitabah — Menulis','الكتابة','Menyusun teks deskriptif objektif tentang agama/tempat ibadah berdasarkan peta dan bacaan, menggunakan dua jenis jumlah.','96–97','Latihan buku meminta siswa menulis teks deskriptif tentang agama di Indonesia dan deskripsi wilayah/negara menggunakan deskripsi umum dan khusus.',['religion.religion','religion.mosque','religion.church','religion.temple','religion.tolerance'],[],[
    ['complete-sentence','Lengkapi Jumlah Ismiyyah: الْمُسْلِمُ ...','مُجْتَهِدٌ.','Khabar menerangkan Mubtada’.','Gunakan contoh rangkuman buku.'],
    ['reorder-words','Susun يُصَلِّي / الْمُسْلِمُونَ / فِي / الْمَسَاجِدِ.','يُصَلِّي الْمُسْلِمُونَ فِي الْمَسَاجِدِ.','Kalimat dimulai dengan Fi’il dan diikuti Fa’il.','Mulai dengan kata kerja يُصَلِّي.'],
    ['sort-sentence-types','Kelompokkan الْمَسْجِدُ كَبِيرٌ dan يَتَعَبَّدُ الْمُؤْمِنُونَ.','Pertama Ismiyyah; kedua Fi’liyyah.','Pola ditentukan oleh unsur awal dan susunan kalimat.','Cari Mubtada’ atau Fi’il di awal.'],
    ['description-order','Susun teks: deskripsi umum objek → rincian khusus tempat ibadah.','الوصف العام lalu الوصف الخاص.','Teks deskriptif dimulai dari pengenalan umum lalu rincian.','Gunakan dua struktur teks.'],
    ['write-description','Tulislah deskripsi objektif singkat tentang satu tempat ibadah berdasarkan informasi buku.','Rubrik: fakta, deskripsi umum/khusus, kalimat benar, sikap netral.','Tugas tidak meminta penilaian atau perbandingan keyakinan.','Gunakan informasi faktual dan struktur deskriptif.']
   ],{criteria:['Akurasi fakta sesuai bacaan','Struktur deskriptif','Ketepatan Jumlah Ismiyyah/Fi’liyyah','Bahasa netral dan santun']}),
   S('ch06-religions','kalam','Kalam — Berbicara','الكلام','Meminta dan memberikan informasi tentang agama dan tempat ibadah secara objektif, santun, dan tidak membandingkan keyakinan.','98–99','Latihan berbicara meminta siswa bertukar tanya jawab tentang agama/tempat ibadah dan berperan sebagai penyiar berdasarkan gambar.',['religion.religion','religion.mosque','religion.church','religion.temple','religion.tolerance'],[],[
    ['pronunciation','Ucapkan مَسْجِدٌ، كَنِيسَةٌ، مَعْبَدٌ، التَّسَامُحُ.','Pelafalan kosakata sesuai harakat.','Perhatikan bunyi dan harakat.','Ucapkan satu per satu.'],
    ['ask-information','Tanyakan di mana umat Islam melaksanakan salat.','أَيْنَ يُصَلِّي الْمُسْلِمُونَ؟','Pertanyaan sesuai tema dan model buku.','Gunakan أَيْنَ untuk menanyakan tempat.'],
    ['give-information','Jawab pertanyaan tentang tempat salat umat Islam.','يُصَلِّي الْمُسْلِمُونَ فِي الْمَسَاجِدِ.','Jawaban sesuai bacaan Bab 6.','Gunakan pola Fi’liyyah.'],
    ['news-presenter','Berperan sebagai penyiar dan sampaikan satu fakta tentang tempat ibadah berdasarkan buku.','Rubrik: fakta, struktur kalimat, dan penyampaian santun.','Penyiar menyampaikan informasi faktual tanpa menghakimi.','Gunakan satu kartu informasi.'],
    ['respectful-dialogue','Lakukan dialog meminta dan memberi informasi tentang keberagaman.','Rubrik: pertanyaan jelas, jawaban faktual, saling menghormati.','Gunakan bahasa netral dan tidak membandingkan keyakinan.','Pilih fakta yang tertulis dalam bacaan.']
   ],{criteria:['Ketepatan informasi','Kesantunan dan netralitas','Struktur kalimat','Pelafalan dan kelancaran']}),
   S('ch06-religions','mission','Misi Akhir — Pameran Informasi Keberagaman','مَهَمَّةُ مَعْرِضِ التَّنَوُّعِ','Menyusun kartu informasi secara objektif dan mengelompokkan kalimat berdasarkan struktur gramatikal.','87–100','Konteks game: kartu pameran belum dikelompokkan. Pemain menyusun informasi agama dan tempat ibadah berdasarkan bacaan, tanpa klaim di luar sumber.',['religion.religion','religion.islam','religion.mosque','religion.church','religion.temple','religion.tolerance'],[],missionTasks('ch06-religions',[
    ['Temukan kartu agama, masjid, gereja, tempat ibadah, dan toleransi.','Lima kartu informasi ditemukan.','Semua kartu terkait kosakata Bab 6.','Periksa panel informasi pameran.'],
    ['Cocokkan kosakata tempat ibadah dengan arti dalam buku.','مَسْجِدٌ = masjid; كَنِيسَةٌ = gereja; مَعْبَدٌ = tempat ibadah.','Gunakan daftar mufradat Bab 6.','Buka Kamus Detektif kategori Bab 6.'],
    ['Kelompokkan kalimat berdasarkan deskripsi umum dan khusus.','Pengenalan objek = الوصف العام; rincian = الوصف الخاص.','Struktur mengikuti teks deskriptif Bab 6.','Bedakan definisi dan rincian.'],
    ['Klasifikasikan الْمُسْلِمُ مُجْتَهِدٌ dan يُصَلِّي الْمُسْلِمُونَ.','Jumlah Ismiyyah dan Jumlah Fi’liyyah.','Kalimat pertama Mubtada’+Khabar; kedua Fi’il+Fa’il.','Periksa kata pertama.'],
    ['Sampaikan informasi pameran secara lisan dengan bahasa netral.','Rubrik: fakta, struktur kalimat, dan sikap menghormati semua agama.','Kesimpulan hanya berdasarkan informasi sumber.','Gunakan fakta dan hindari perbandingan keyakinan.']
   ]))
  ]),
  mastery:[
   q('r1','vocabulary','Apa arti دِينٌ?',['Agama','Masjid','Gereja','Toleransi'],0,'دِينٌ berarti agama.','religion.religion',true),
   q('r2','vocabulary','مَسْجِدٌ berarti ...',['Masjid','Gereja','Tempat ibadah','Kubah'],0,'مَسْجِدٌ berarti masjid.','religion.mosque',true),
   q('r3','reading','Apa dua struktur teks deskriptif Bab 6?',['Deskripsi umum dan deskripsi khusus','Tesis dan argumen','Orientasi dan kejadian','Tujuan dan langkah'],0,'Struktur teks deskriptif terdiri dari deskripsi umum dan khusus.'),
   q('r4','reading','Berapa agama yang disebutkan dalam bacaan Bab 6?',['Enam','Lima','Empat','Tujuh'],0,'Bacaan menyebut سِتَّةُ أَدْيَانٍ.'),
   q('r5','grammar','Jumlah Fi’liyyah terdiri dari ...',['Fi’il + Fa’il','Mubtada’ + Khabar','Tesis + Argumen','Huruf jar + isim'],0,'Jumlah Fi’liyyah terdiri dari kata kerja dan pelaku.'),
   q('r6','grammar','Jumlah Ismiyyah terdiri dari ...',['Mubtada’ + Khabar','Fi’il + Fa’il','Adad + Ma’dud','Tesis + Penguatan'],0,'Jumlah Ismiyyah terdiri dari Mubtada’ dan Khabar.'),
   q('r7','vocabulary','Apa arti التَّسَامُحُ?',['Toleransi','Agama','Tempat ibadah','Menara'],0,'التَّسَامُحُ berarti toleransi.','religion.tolerance',true),
   q('r8','grammar','الْمُسْلِمُ مُجْتَهِدٌ adalah contoh ...',['Jumlah Ismiyyah','Jumlah Fi’liyyah','Teks prosedur','Teks rekon'],0,'Kalimat dimulai dengan isim dan terdiri dari Mubtada’+Khabar.'),
   q('r9','grammar','يُصَلِّي الْمُسْلِمُونَ فِي الْمَسَاجِدِ adalah contoh ...',['Jumlah Fi’liyyah','Jumlah Ismiyyah','Teks deskriptif','Huruf ‘athaf'],0,'Kalimat dimulai dengan Fi’il dan diikuti Fa’il.'),
   q('r10','vocabulary','Apa arti كَنِيسَةٌ?',['Gereja','Masjid','Kuil','Kubah'],0,'كَنِيسَةٌ berarti gereja.','religion.church',true)
  ]
 }
};

export const EPISODE_META=[
 {id:'ch01-shopping',title:'Audit Transaksi Pasar',shortTitle:'Belanja',location:'Pasar dan pusat perbelanjaan',label:'01',icon:'🛒',accent:'amber',semester:'Ganjil',titleArabic:'التسوق'},
 {id:'ch02-health',title:'Berkas Kunjungan Klinik',shortTitle:'Kesehatan',location:'Rumah sakit dan apotek',label:'02',icon:'🏥',accent:'cyan',semester:'Ganjil',titleArabic:'الصحة'},
 {id:'ch03-travel',title:'Jadwal Perjalanan Tertukar',shortTitle:'Perjalanan',location:'Terminal, bandara, dan wisata',label:'03',icon:'✈️',accent:'violet',semester:'Ganjil',titleArabic:'السفر'},
 {id:'ch04-hajj-umrah',title:'Rekonstruksi Jurnal Ibadah',shortTitle:'Haji dan Umrah',location:'Pusat informasi haji dan umrah',label:'04',icon:'🕋',accent:'rose',semester:'Genap',titleArabic:'الحج والعمرة'},
 {id:'ch05-ict',title:'Verifikasi Informasi Digital',shortTitle:'Teknologi',location:'Laboratorium komputer',label:'05',icon:'💻',accent:'cyan',semester:'Genap',titleArabic:'تكنولوجيا الإعلام والاتصال'},
 {id:'ch06-religions',title:'Pameran Informasi Keberagaman',shortTitle:'Agama di Indonesia',location:'Ruang pameran madrasah',label:'06',icon:'🤝',accent:'amber',semester:'Genap',titleArabic:'الأديان في إندونيسيا'}
];
export const ALL_EPISODE_IDS=CAMPAIGN_CONFIG.episodeOrder;
