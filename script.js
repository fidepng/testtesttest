// Efek scroll animasi
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach(element => {
    observer.observe(element);
  });
}

window.addEventListener('load', animateOnScroll);

// Animasi typing header
const typedTextSpan = document.querySelector('.typed-text');
const textArray = ['Halo! Selamat Datang. '];
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100); // Mengatur kecepatan mengetik
  } else {
    setTimeout(deleteText, 3000); // Jeda sebelum menghapus teks
  }
}

function deleteText() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].slice(0, charIndex - 1);
    charIndex--;
    setTimeout(deleteText, 50); // Mengatur kecepatan menghapus teks
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) {
      textArrayIndex = 0;
    }
    setTimeout(type, 1000); // Jeda sebelum mengetik teks berikutnya
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(type, 1000); // Jeda sebelum memulai animasi
});

// Membuat elemen lightbox hanya sekali saat dimuat
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
document.body.appendChild(lightbox);

// Menambahkan event listener pada setiap gambar di galeri
const galleryImages = document.querySelectorAll('.image-grid img');
galleryImages.forEach(image => {
  image.addEventListener('click', () => {
    const imgSrc = image.src;
    const lightboxImage = document.createElement('img');
    lightboxImage.src = imgSrc;
    lightbox.innerHTML = '';
    lightbox.appendChild(lightboxImage);
    lightbox.style.display = 'flex';
  });
});

// Menambahkan event listener untuk menutup lightbox saat di-klik
lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Data artikel blog
const blogs = [
  {
    title: "Hasil Swiss Open 2024: Gregoria Kalah Dramatis di Final",
    date: "24 Maret 2024",
    author: "Novitasari Dewi Salusi",
    image: "asset/img/gregoria-mariska-tunjung_169.jpeg",
    description: "Gregoria Mariska Tunjung harus puas jadi runner-up Swiss Open 2024 usai kalah dari Carolina Marin. Gregoria kalah meski sempat dapat match point lebih dulu. Dalam pertandingan final Swiss Open 2024 di St. Jakobshalle, Basel, Minggu (24/3/2024) malam WIB, Gregoria melewati duel ketat sepanjang tiga gim melawan Marin. Setelah bertarung selama 1 jam 21 menit, Gregoria kalah 19-21, 21-13, 20-22 dari juara dunia tiga kali itu.",
    url: "https://sport.detik.com/raket/d-7259457/hasil-swiss-open-2024-gregoria-kalah-dramatis-di-final"
  },
  {
    title: "Mengapa Revolusi Industri Penting? Dampaknya Pada Masa Lalu, Kini, dan Masa Depan",
    date: "10 April 2024",
    author: "Ilman Kava Billah",
    image: "asset/img/revolusi-industri-660189b7c57afb423f32acd2.jpg",
    description: "Salah satu peristiwa penting dalam sejarah adalah revolusi industri, yang mengubah cara orang hidup, bekerja, dan berinteraksi satu sama lain. Pertama-tama, revolusi industri memainkan peran penting dalam mendorong kemajuan ekonomi. Ini menghasilkan peningkatan efisiensi produksi dan penyebaran teknologi baru.",
    url: "https://www.kompasiana.com/ilmankava27/66018856de948f50ff6a55f2/mengapa-revolusi-industri-penting-dampaknya-pada-masa-lalu-kini-dan-masa-depan"
  },
  {
    title: "Kilas Balik Sejarah Seni Digital: Dari John Whitney Hingga NFT",
    date: "15 April 2024",
    author: "Tri Wahyu Prasetyo",
    image: "asset/img/screenshot-2023-01-23-162549jpg-20230304021600.jpg",
    description: "Nationalgeographic.co.id - Kemegahan seni digital dewasa ini tidak lepas dari perkembangan teknologi, dan eksplorasi seniman-seniman terdahulu. Seperti kata pepatah, 'perjalanan seribu mil dimulai dengan langkah pertama.'",
    url: "https://nationalgeographic.grid.id/read/133715199/kilas-balik-sejarah-seni-digital-dari-john-whitney-hingga-nft?page=all"
  }
];

const blogList = document.querySelector('.blog-list');
const prevButton = document.querySelector('.pagination .prev');
const nextButton = document.querySelector('.pagination .next');
const pageInfo = document.querySelector('.pagination .page-info');

let currentPage = 1;
const itemsPerPage = 2; // Jumlah artikel yang ditampilkan per halaman

// Fungsi untuk menampilkan artikel blog
function showBlogs(blogs, page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const blogsToShow = blogs.slice(startIndex, endIndex);

  blogList.innerHTML = '';
  blogsToShow.forEach(blog => {
    const article = document.createElement('article');
    article.innerHTML = `
      <header>
        <h3 class="title">${blog.title}</h3>
        <p class="meta">${blog.date} | ${blog.author}</p>
      </header>
      <img src="${blog.image}" alt="Gambar Artikel">
      <p class="description">${blog.description}</p>
      <footer>
        <a href="${blog.url}" class="read-more" target="_blank" rel="noopener noreferrer">Baca Selengkapnya</a>
      </footer>
    `;
    blogList.appendChild(article);
  });
}

// Fungsi untuk memperbarui tampilan pagination
function updatePagination() {
  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

// Event listener untuk tombol pagination
prevButton.addEventListener('click', () => {
  currentPage--;
  showBlogs(blogs, currentPage);
  updatePagination();
});

nextButton.addEventListener('click', () => {
  currentPage++;
  showBlogs(blogs, currentPage);
  updatePagination();
});

// Inisialisasi tampilan awal
showBlogs(blogs, currentPage);
updatePagination();

// Navigasi hamburger
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav__items');

function myFunction(x) {
  x.classList.toggle("change");
  navLinks.classList.toggle("show");
}

// Nav sticky
const nav = document.querySelector('nav');
const logo = document.querySelector('.logo');

window.addEventListener('scroll', function() {
  const scrollPosition = window.pageYOffset;
  const headerHeight = document.querySelector('.header').offsetHeight;

  if (scrollPosition >= headerHeight) {
    nav.classList.add('nav-sticky');
  } else {
    nav.classList.remove('nav-sticky');
  }
});