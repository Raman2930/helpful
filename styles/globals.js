@tailwind base;
@tailwind components;
@tailwind utilities;

.bg-growing-underline {
  background-size: 0 3px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.3s ease-in-out;
}

.group:hover .bg-growing-underline {
  background-size: 100% 3px;
}

.bg-growing-underline {
  background-size: 0 3px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.3s ease-in-out;
}

.group:hover .bg-growing-underline {
  background-size: 100% 3px;
}