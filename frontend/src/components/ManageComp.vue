<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img :src="employee?.imageUrl" alt="" class="employee-image" />
        <h2>{{ employee?.name }}</h2>
      </div>
      <div class="flip-card-back">
        <h3>Position: {{ employee?.position }}</h3>
        <p>Department: {{ employee?.department }}</p>
        <p>Salary: R{{ employee?.salary }}</p>
        <p>Contact: {{ employee?.contact }}</p>
        <p>Employment History: {{ employee?.employmentHistory }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["employee"],
};
</script>
<style scoped>
.flip-card {
  background-color: transparent;
  width: 90vw;
  max-width: 300px;
  min-width: 220px;
  height: 60vw;
  max-height: 420px;
  min-height: 220px;
  perspective: 1000px;
  margin: 30px auto 40px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
}
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}
.flip-card-front {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.flip-card-back {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #219aea0f;
  border-radius: 10px;
  box-shadow: 0 4px;
  transform: rotateY(180deg);
}
.employee-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

@media (max-width: 900px) {
  .flip-card {
    max-width: 300px;
    height: 70vw;
    max-height: 350px;
  }
}

@media (max-width: 600px) {
  .flip-card {
    width: 95vw;
    max-width: 95vw;
    height: 70vw;
    max-height: 70vw;
    min-height: 160px;
  }
}
</style>
